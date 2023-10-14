import dbConnect from "@/server/config/dbConnect";
import { registerUser } from "@/server/controllers/authControllers";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

interface RequestContext {}

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

router.post(registerUser);   //api/auth/register

export async function POST(request: NextRequest, ctx: RequestContext) {
  return router.run(request, ctx);
}
