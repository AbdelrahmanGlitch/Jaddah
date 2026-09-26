# LAVIE TOURS — لافي تورز

Arabic-first (full RTL, with an English toggle) website for **LAVIE TOURS**, an Egyptian travel company for domestic tourism and flight tickets.
Frontend only: no backend. The booking form opens WhatsApp to Lavie's booking line with the request written out.

```bash
npm install
npm run dev     # http://localhost:3000
```

Stack: Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion · Lucide React

## Pages
- `/`: hero, about, services, hotel offers, destinations, flight tickets, how to book, Facebook posts, gallery, booking request, FAQ, contact
- `/trips`: every offer, filterable by destination and type (price, duration and date filters appear automatically once offers carry that data)
- `/trips/[id]`: offer detail with photos, highlights, board basis, the source Facebook post date, and a booking form

## Where the content comes from
Everything company-specific comes from the official Facebook page **https://www.facebook.com/LAVIE55555** (page info plus posts from 17 May to 15 Jul 2026, checked 26 Sep 2026). No statistics, reviews, awards, years or customer counts are used.

| File | What it holds |
| --- | --- |
| `data/company.ts` | Name, logo, Facebook, booking lines, page phone, offices (Cairo, Kafr El Sheikh), payment methods. The header comment lists what is verified and what **still needs confirmation** |
| `data/trips.ts` | The three hotel offers (Dayz Inn Alamein, Tolip Galala Heights, Gewan). The posts give no prices or dates, so the site shows "السعر عند الاستعلام" |
| `data/destinations.ts` | New Alamein and Ain Sokhna, the only destinations in Lavie's offers |
| `data/content.ts` | Services, booking steps, and the latest Facebook posts |
| `data/faqs.ts` | FAQ answered only from published information |
| `data/gallery.ts` / `data/images.ts` | Photos from Lavie's own posts, in `/public/images/lavie/` |
| `lib/dictionary.ts` | All UI text in Arabic and English |

## Before going live, confirm with LAVIE TOURS
- **Photos:** Facebook only exposes small previews, so the Dayz Inn photos are 250–390 px wide. Replace the files in `/public/images/lavie/` with the originals (same names).
- **Cairo office floor:** posts say both the 12th and the 13th floor, so the floor isn't shown.
- **Hotel name:** the offer post says "توليب الجلالة هايتس" and a promo design says "Tolip Resort 71 Galala Hills". Confirm the exact English name.
- **WhatsApp number:** chat buttons use 01009316766 (the first booking line; every post says the lines take calls and WhatsApp).
- **Not shown until confirmed:** email `reservation@lavietours-eg.com`, phone 01277778973, the New Nozha address, Hajj & Umrah, organized group trips, and international trips.
- **Offers:** add prices, dates and new offers to `data/trips.ts` as Lavie publishes them. The Dayz Inn offer is marked "Summer 2026".
"# Lavie" 
