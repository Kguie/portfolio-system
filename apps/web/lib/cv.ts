export function getCvUrl(locale: string): string {
  const normalized = locale.toLowerCase();

  if (normalized === "fr" || normalized.startsWith("fr-")) {
    return "/cv/kevin-guieba-cv-fr-2026.pdf";
  }

  return "/cv/kevin-guieba-cv-en-2026.pdf";
}
