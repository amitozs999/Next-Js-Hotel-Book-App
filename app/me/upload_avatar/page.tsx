import UploadAvatar from "@/components/user/UploadAvatar";
import React from "react";

import { NextResponse } from "next/server";
export const metadata = {
  title: "Upload Avatar",
};

const UploadAvatarPage = () => {
  return (
    <div>
      <UploadAvatar />
    </div>
  );
};

export default UploadAvatarPage;
