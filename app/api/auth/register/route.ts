import dbConnect from "@/server/config/dbConnect";
import { registerUser } from "@/server/controllers/authControllers";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

import { NextResponse } from "next/server";
interface RequestContext {}

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

router.post(registerUser);   //api/auth/register

export async function POST(request: NextRequest, ctx: RequestContext) : Promise<NextResponse> {
  return router.run(request, ctx) as Promise<NextResponse>;
}
