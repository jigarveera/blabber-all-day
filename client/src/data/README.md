# Menu catalog

`menuCatalog.json` contains the menu items published by the three Blabber All Day Zomato outlet pages on 13 October 2026. Its `id` is the Zomato menu item ID. The `outlet` field separates Juhu, Borivali, and Thane.

The `zomatoLink` and `swiggyLink` fields are **outlet menu links**, as indicated by `linkScope: "outlet-menu"`. Neither public page exposed a verified link that opens a particular dish in the app. The ordering dialog copies the dish name when possible and sends visitors to the selected outlet's menu.

Source pages:

- [Juhu on Zomato](https://www.zomato.com/mumbai/blabber-all-day-juhu/order)
- [Borivali on Zomato](https://www.zomato.com/mumbai/blabber-all-day-borivali-east/order)
- [Thane on Zomato](https://www.zomato.com/mumbai/blabber-all-day-hiranandani-estate-thane-west-thane/order)

Run `node scripts/scrape-menu.mjs` from the project root to refresh the catalog. Zomato may limit automated requests; the script also accepts a directory of downloaded `juhu.html`, `borivali.html`, and `thane.html` pages.
