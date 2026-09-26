/**
 * CENTRALIZED IMAGE LIBRARY
 * ------------------------------------------------------------------
 * Every photo on the website is referenced from this file.
 * All photos come from LAVIE TOURS' own Facebook posts
 * (https://www.facebook.com/LAVIE55555) and live in /public/images/lavie/.
 *
 * Resolution: Facebook only exposes small previews publicly, so the Dayz Inn
 * photos are ~260–390px wide. To upgrade, replace the file with Lavie's original
 * (same file name) — nothing else needs to change.
 */

const img = (name: string) => `/images/lavie/${name}.webp`;

export const images = {
  // Tolip Galala Heights, Ain Sokhna — frame from Lavie's video post (8 Jun 2026), 1080×1920
  tulipAquaPark: img("tulip-galala-heights-aqua-park"),
  // Gewan, New Alamein — frame from Lavie's video post (8 Jun 2026), cropped to 720×930 above the burned-in caption
  gewanPool: img("gewan-alamein-pool"),
  // Gewan, New Alamein — photo from Lavie's post (17 May 2026), 565×377
  gewanResort: img("gewan-alamein-resort"),
  // Dayz Inn Alamein — photos from Lavie's album post (15 Jul 2026)
  dayzSeafront: img("dayz-inn-alamein-01"), // 252×315 — sea and beach with the towers behind
  dayzUmbrellas: img("dayz-inn-alamein-02"), // 252×315 — beach umbrellas in front of the Alamein towers
  dayzCourtyardNight: img("dayz-inn-alamein-03"), // 391×260 — hotel courtyard and pool at dusk
  dayzBeachSunset: img("dayz-inn-alamein-04"), // 261×392 — beach at sunset
} as const;

export type ImageKey = keyof typeof images;
