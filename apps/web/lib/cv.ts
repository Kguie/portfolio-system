import { getCvUrl as getCvUrlFromJs } from "./cv.mjs";

export function getCvUrl(locale: string): string {
  return getCvUrlFromJs(locale);
}
