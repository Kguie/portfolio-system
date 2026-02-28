import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.redirect("mailto:kevin.guieba@gmail.com");
}
