import dbConnect from "@/server/config/dbConnect";
import { webhookCheckout } from "@/server/controllers/paymentControllers";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

interface RequestContext {}

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

router.post(webhookCheckout);

export async function POST(request: NextRequest, ctx: RequestContext) {
  return router.run(request, ctx);
}
