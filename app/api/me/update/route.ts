import dbConnect from "@/server/config/dbConnect";
import { updateProfile } from "@/server/controllers/authControllers";
import { isAuthenticatedUser } from "@/server/middlewares/auth";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

import { NextResponse } from "next/server";
interface RequestContext {}

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

router.use(isAuthenticatedUser).put(updateProfile);

export async function PUT(request: NextRequest, ctx: RequestContext) : Promise<NextResponse> {
  return router.run(request, ctx) as Promise<NextResponse>;
}
