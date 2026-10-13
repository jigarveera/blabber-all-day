# Blabber All Day

A React/Vite restaurant site with a Node/Express API.

## Run locally

1. In `client`, run `npm install` and `npm run dev`.
2. In `server`, run `npm install`, copy `.env.example` to `.env`, set `BLOG_ADMIN_PASSWORD` and `SESSION_SECRET`, then run `npm start`.

Vite proxies `/api` to `http://localhost:5000`. In production, serve the client and proxy `/api` to Express on the same site origin.

## Pages

- `/` — restaurant landing page with outlet and order calls to action, FAQ and reviews.
- `/menu` — editorial menu preview with carousel, search, category and diet filters, and sorting.
- `/locations` — Juhu, Borivali and Thane, each linked to its own District reservation page.
- `/order` — build a dish enquiry for Blabber's published WhatsApp number, or continue to Zomato, Swiggy or District. A WhatsApp enquiry is **not a confirmed order**; the team must confirm price, availability and fulfilment.
- `/blogs` — restaurant journal. `/team/journal` is the password-protected publishing page for the Blabber team.

Restaurant photos are stored under `client/public/images`. The menu is a preview; some gallery images are illustrative, and the ordering partner has the current menu, prices and availability.

## Google reviews

Set `GOOGLE_PLACES_API_KEY` and the verified Google Place IDs in `server/.env` to show live reviews through [Places API (New) Place Details](https://developers.google.com/maps/documentation/places/web-service/place-details). The API key stays on the server. When credentials are absent or Google is unavailable, the review section links to Google Maps instead of showing invented reviews.

## Journal publishing

Set a strong `BLOG_ADMIN_PASSWORD` and random `SESSION_SECRET` in `server/.env`. Only an authenticated team session can POST stories. Published stories are stored in `server/data/blogs.json`, so production hosting needs a persistent disk or this storage should be replaced with a database. The three initial editorial stories ship with the client.

## Sources

Restaurant photography and contact information: [Blabber All Day](https://blabberallday.com/). Dish photos used for the bao, pesto pasta and Malay curry menu cards are from Blabber's listings on [Zomato](https://www.zomato.com/mumbai/blabber-all-day-juhu/order). Outlet reservation links are from [District](https://www.district.in/dining/mumbai/blabber-all-day-juhu).
