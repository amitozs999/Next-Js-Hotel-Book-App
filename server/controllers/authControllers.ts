import { NextRequest, NextResponse } from "next/server";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";
import User from "../models/user";


import ErrorHandler from "../utils/errorHandler";
import { delete_file, upload_file } from "../utils/cloudinary";
import { resetPasswordHTMLTemplate } from "../utils/emailTemplates";
import sendEmail from "../utils/sendEmail";
import crypto from "crypto";


// Register user  =>  /api/auth/register
export const registerUser = catchAsyncErrors(async (req: NextRequest) => {
  const body = await req.json();
// {
//   "name":"ekas", 
//   "email":"ekas@gmail.com",        inside body of post api in json
//   "password":"123456"
// }
  const { name, email, password } = body;

  const user = await User.create({
    name,
    email,
    password,
  });

  return NextResponse.json({
    success: true,
  });
});




// Update use profile  =>  /api/me/update
export const updateProfile = catchAsyncErrors(async (req: NextRequest) => {
  const body = await req.json();

  const userData = {
    name: body.name,
    email: body.email,
  };

  const user = await User.findByIdAndUpdate(req.user._id, userData);

  return NextResponse.json({
    success: true,
    user,
  });
});

// Update password  =>  /api/me/update_password
export const updatePassword = catchAsyncErrors(async (req: NextRequest) => {

  console.log('hijo');
  const body = await req.json();
  console.log('hijoo');
  const user = await User.findById(req?.user?._id).select("+password");
  console.log('hijooo');
  console.log(user);
  const isMatched = await user.comparePassword(body.oldPassword);

  console.log(isMatched+'yy');
  console.log('hijo1ismatch');
  if (!isMatched) {
    console.log('hijo1ismathincorrec');
    throw new ErrorHandler("Old password is incorrect", 400);
  }

  user.password = body.password;
  await user.save();
  console.log('hijo1ismathsave');
  return NextResponse.json({
    success: true,
  });
});



// Upload user avatar  =>  /api/me/upload_avatar
export const uploadAvatar = catchAsyncErrors(async (req: NextRequest) => {

  const body = await req.json();

  const avatarResponse = await upload_file(body?.avatar, "bookit/avatars");

  // Remove avatar from cloudinary if already has some
  if (req?.user?.avatar?.public_id) {
    await delete_file(req?.user?.avatar?.public_id);
  }

  const user = await User.findByIdAndUpdate(req?.user?._id, {
    avatar: avatarResponse,
  });

  return NextResponse.json({
    success: true,
    user,
  });
});



// Forgot password  =>  /api/password/forgot
export const forgotPassword = catchAsyncErrors(async (req: NextRequest) => {
  const body = await req.json();

  const user = await User.findOne({ email: body.email });

  console.log('forg here');

  if (!user) {
    console.log('forg here1');
    throw new ErrorHandler("User not found with this email", 404);
  }
  console.log('forg here22');
  // Get reset token
  const resetToken = user.getResetPasswordToken();

  console.log('forg here2');
  console.log(resetToken);

  await user.save();

  // Create reset password url
  const resetUrl = `${process.env.API_URL}/password/reset/${resetToken}`;

  console.log(resetUrl);

  const message = resetPasswordHTMLTemplate(user?.name, resetUrl);


  //send hom reset passw link
  try {
    await sendEmail({
      email: user.email,
      subject: "Password Recovery",
      message,
    });
  } catch (error: any) {

    console.log('error je');

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    throw new ErrorHandler(error?.message, 500);
  }

  return NextResponse.json({
    success: true,
    user,
  });
});




// Reset password  =>  /api/password/reset/:token
export const resetPassword = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { token: string } }) => {

    const body = await req.json();

    // Hash the token
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(params.token)
      .digest("hex");

      //check if any user has this pasw token

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });


    if (!user) {
      throw new ErrorHandler(
        "Password reset token is invalid or has been expired",
        404
      );
    }

    if (body.password !== body.confirmPassword) {
      throw new ErrorHandler("Passwords does not match", 400);
    }

    // Set the new password
    user.password = body.password;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    return NextResponse.json({
      success: true,
    });
  }
);



// Get all users  =>  /api/admin/users
export const allAdminUsers = catchAsyncErrors(async (req: NextRequest) => {

  console.log('hereji');
  const users = await User.find();
  
  console.log('hereji'+users);
  return NextResponse.json({
    users,
  });
});




// Get user details  =>  /api/admin/users/:id
export const getUserDetails = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const user = await User.findById(params.id);

    if (!user) {
      throw new ErrorHandler("User not found with this ID", 404);
    }

    return NextResponse.json({
      user,    //response me vo returned user
    });
  }
);





// Update user details  =>  /api/admin/users/:id
export const updateUser = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const body = await req.json();

    const newUserData = {
      name: body.name,
      email: body.email,
      role: body.role,
    };

    const user = await User.findByIdAndUpdate(params.id, newUserData);  //update is user ko is details se

    return NextResponse.json({
      user,
    });
  }
);




// Delete user  =>  /api/admin/users/:id
export const deleteUser = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { id: string } }) => {


    const user = await User.findById(params.id);

    if (!user) {
      throw new ErrorHandler("User not found with this ID", 404);
    }

    // Remove user avatar from cloudinary
    if (user?.avatar?.public_id) {
      await delete_file(user?.avatar?.public_id);
    }

    await user.deleteOne();   //then delete user

    return NextResponse.json({
      success: true,
    });
  }
);





