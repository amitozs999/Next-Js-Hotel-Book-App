import dbConnect from "@/server/config/dbConnect";
import {
  deleteRoomImage,
  uploadRoomImages,
} from "@/server/controllers/roomControllers";
import {
  authorizeRoles,
  isAuthenticatedUser,
} from "@/server/middlewares/auth";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

interface RequestContext {
  params: {
    id: string;
  };
}

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

router.use(isAuthenticatedUser, authorizeRoles("admin")).put(deleteRoomImage);

export async function PUT(request: NextRequest, ctx: RequestContext) {
  return router.run(request, ctx);
}
