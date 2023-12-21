import dbConnect from "@/server/config/dbConnect";
import { allAdminUsers } from "@/server/controllers/authControllers";
import {
  authorizeRoles,
  isAuthenticatedUser,
} from "@/server/middlewares/auth";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
interface RequestContext {}

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

router.use(isAuthenticatedUser, authorizeRoles("admin")).get(allAdminUsers);

export async function GET(request: NextRequest, ctx: RequestContext): Promise<NextResponse>  {
  return router.run(request, ctx) as Promise<NextResponse>;
}
