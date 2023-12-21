import dbConnect from "@/server/config/dbConnect";
import { deleteRoom, updateRoom } from "@/server/controllers/roomControllers";
import {
  authorizeRoles,
  isAuthenticatedUser,
} from "@/server/middlewares/auth";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
interface RequestContext {
  params: {
    id: string;
  };
}

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

router.use(isAuthenticatedUser, authorizeRoles("admin")).put(updateRoom);
router.use(isAuthenticatedUser, authorizeRoles("admin")).delete(deleteRoom);

export async function PUT(request: NextRequest, ctx: RequestContext)  : Promise<NextResponse> {
  return router.run(request, ctx) as Promise<NextResponse>;
}

export async function DELETE(request: NextRequest, ctx: RequestContext) : Promise<NextResponse> {
  return router.run(request, ctx) as Promise<NextResponse>;
}
