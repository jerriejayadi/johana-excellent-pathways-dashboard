import { NextRequest, NextResponse } from "next/server";
import { responseSuccess } from "./mockUpData";

export async function GET(request: NextRequest) {
  return NextResponse.json(responseSuccess, {
    status: 200,
    statusText: "success",
  });
}
