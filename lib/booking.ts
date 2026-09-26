"use client";

export type BookingType = "hotel" | "flight" | "domestic" | "other";

export type BookingPrefill = { type?: BookingType; destination?: string; tripId?: string };

export const PREFILL_EVENT = "lavie-booking-prefill";

/** Pre-select fields in the home page booking form (#booking) and scroll to it. */
export function requestBooking(prefill: BookingPrefill) {
  const form = document.getElementById("booking");
  if (!form) return;
  window.dispatchEvent(new CustomEvent<BookingPrefill>(PREFILL_EVENT, { detail: prefill }));
  form.scrollIntoView({ behavior: "smooth", block: "start" });
}
