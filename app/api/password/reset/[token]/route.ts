import dbConnect from "@/server/config/dbConnect";
import { resetPassword } from "@/server/controllers/authControllers";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

import { NextResponse } from "next/server";
interface RequestContext {}

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

router.put(resetPassword);

export async function PUT(request: NextRequest, ctx: RequestContext): Promise<NextResponse>  {
  return router.run(request, ctx) as Promise<NextResponse>;
}
