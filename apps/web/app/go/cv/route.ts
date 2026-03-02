import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { resolveLocaleFromRequest } from "@/app/go/_lib/locale";
import { getCvUrl } from "@/lib/cv";

export function GET(request: NextRequest) {
  const locale = resolveLocaleFromRequest(request);
  const destination = getCvUrl(locale);

  return NextResponse.redirect(new URL(destination, request.url));
}
