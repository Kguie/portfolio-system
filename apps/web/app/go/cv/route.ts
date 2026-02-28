import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { resolveLocaleFromRequest } from "@/app/go/_lib/locale";

export function GET(request: NextRequest) {
  const locale = resolveLocaleFromRequest(request);
  const destination =
    locale === "fr"
      ? "/cv/kevin-guieba-cv-fr-2026.pdf"
      : "/cv/kevin-guieba-cv-en-2026.pdf";

  return NextResponse.redirect(new URL(destination, request.url));
}
