import { NextRequest, NextResponse } from "next/server";
import { responseSuccess } from "../mockUpData";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const allData = responseSuccess.result;
  console.log(params);
  const selectedData = allData.filter((rows) => rows.id === params.id);
  if (selectedData.length === 0) {
    return NextResponse.json(
      {
        status: false,
        statusCode: 404,
        message: "Data not found!",
      },
      { status: 404, statusText: "data_not_found" }
    );
  }
  return NextResponse.json(selectedData[0], { status: 200 });
}
