# Jeddah Tourism — Website Concept (Frontend Demo)

A premium, bilingual (English / العربية, full RTL) travel website prototype for **Jeddah Tourism**.
Frontend only: no backend, API routes, database or real booking. The booking form shows a simulated success state.

```bash
npm install
npm run dev     # http://localhost:3000
```

Stack: Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion · Lucide React

## Pages
- `/` — Hero, trip finder, about, featured trips, destinations, why us, how it works, social feed, gallery, booking, FAQ, contact
- `/trips` — full catalog with filters (destination, duration, price, trip type, departure month, sort). Filters are reflected in the URL (e.g. `/trips?type=beach`)
- `/trips/[id]` — trip detail: gallery, key facts, overview, included/excluded, itinerary timeline, important info, FAQ, booking form, related trips

## Company & trip data (everything lives in `/data`)
Company details and the five offers (Hajj 1447 AH, Umrah Programs, Rio Hotel, New Royal Palace Hotel, Delmar Hotel) are **verified data supplied by Jeddah Tourism**. Only information that was supplied is shown — sections without data (e.g. itineraries, trip FAQs, availability) are hidden automatically.

| File | What it holds |
| --- | --- |
| `data/company.ts` | Arabic/English names, phone numbers, Alexandria branch, Facebook links. `WHATSAPP_NUMBER` / `EMAIL_ADDRESS` / `INSTAGRAM_URL` are still placeholders and stay hidden until filled in |
| `data/trips.ts` | The five offers. Departure dates are `"MM-DD"` (no year is shown unless supplied). Fixed prices go in `priceOptions`; date-based prices (Delmar) in `pricingSchedule` |
| `data/destinations.ts` | Makkah & Madinah, Marsa Matrouh |
| `data/faqs.ts` | General FAQ (answers based on supplied data only) |
| `data/content.ts` | Why-us points (from supplied data), how-it-works steps, social feed |
| `data/gallery.ts` | Gallery photos |
| `data/images.ts` | **Every image URL in one place**. Photos are still placeholders — put real photos in `/public/images/` and set e.g. `"/images/rio-01.jpg"` |
| `lib/dictionary.ts` | All UI text in English and Arabic |

Notes:
- No number has been designated as WhatsApp, so chat buttons open Facebook Messenger (`m.me/JeddahTourism196`). Set `whatsapp` in `data/company.ts` and they switch to WhatsApp automatically.
- Photos are royalty-free Unsplash placeholders, not Jeddah Tourism photos.
- Trip categories shown in filters are generated from the trips that exist.
"# Jaddah" 
