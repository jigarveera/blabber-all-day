const contactEmail = 'blabberreservations@gmail.com'

const legalPages = {
  privacy: {
    title: 'Privacy policy',
    intro:
      'A clear look at the information involved when you browse our menu, find an outlet, or ask for a table.',
    sections: [
      {
        id: 'information',
        title: 'Information you share',
        paragraphs: [
          'When you prepare a reservation request, you may enter your name, phone number, chosen outlet, party size, date, time, and an optional note. The form prepares a WhatsApp message in your browser. It is sent to us only if you continue in WhatsApp and send that message.',
          'If you call, email, or message an outlet, we receive the details you choose to share in that conversation.',
        ],
      },
      {
        id: 'browser',
        title: 'Information kept in your browser',
        paragraphs: [
          'The menu remembers your search, selected outlet, category, dietary filter, and sort order in your browser’s local storage. These preferences stay on your device until you clear them or your browser removes them. The reservation form does not save its entries to local storage.',
          'Our hosting and network providers may receive routine technical information, such as your IP address, browser type, and requested page, when delivering the website.',
        ],
      },
      {
        id: 'services',
        title: 'Other services on this site',
        paragraphs: [
          'Outlet cards and pages include Google Maps embeds. We also load Google Fonts. Those services may receive technical information from your browser. Links to WhatsApp, Instagram, Zomato, and Swiggy take you to their services, where their own privacy terms apply.',
          'The collaboration reels shown on this site are served as local video files; opening the Instagram link on a reel takes you to Instagram separately.',
        ],
      },
      {
        id: 'use',
        title: 'How we use and handle information',
        paragraphs: [
          'We use messages and contact details you send to answer questions, handle reservation requests, and follow up about a visit. We share a request with the relevant outlet team as needed to respond. Ordering and delivery information entered on Zomato or Swiggy is handled by those platforms.',
          'Please avoid putting sensitive information in the optional reservation note. We keep conversations and related records as needed to respond and meet applicable obligations; there is no fixed retention period for messages stated by this website.',
        ],
      },
      {
        id: 'choices',
        title: 'Your choices and questions',
        paragraphs: [
          'You can clear saved menu preferences through your browser’s site-data settings. You can choose whether to send a prepared WhatsApp request. To ask about information you have shared with us, or to request a correction or deletion where applicable, contact us at the address below.',
        ],
      },
    ],
    resources: [
      {
        label: 'Google Privacy Policy',
        href: 'https://policies.google.com/privacy',
      },
      {
        label: 'WhatsApp Privacy Policy',
        href: 'https://www.whatsapp.com/legal/privacy-policy',
      },
    ],
  },
  cookies: {
    title: 'Cookie policy',
    intro:
      'What this website stores in your browser, and what may be set by embedded services.',
    sections: [
      {
        id: 'our-storage',
        title: 'Our browser storage',
        paragraphs: [
          'The current website code does not set a first-party cookie for menu preferences. It uses local storage under “blabber-menu-preferences-v1” to remember your menu search, outlet, category, dietary filter, and sorting choice.',
          'Local storage is separate from cookies. Clearing this site’s data in your browser removes those preferences and resets the menu choices.',
        ],
      },
      {
        id: 'third-party',
        title: 'Embedded and linked services',
        paragraphs: [
          'Google Maps is embedded on outlet cards and outlet pages. When a map loads, Google may receive information from your browser and use cookies or similar technologies under its own policies. Google Fonts is also loaded from Google.',
          'WhatsApp, Instagram, Zomato, and Swiggy open as separate services when you follow their links. They may use their own cookies after you leave this website.',
        ],
      },
      {
        id: 'controls',
        title: 'How to manage them',
        paragraphs: [
          'You can clear or block cookies and local storage in your browser’s privacy settings. Blocking third-party content may stop embedded maps or other external features from displaying. You can also review Google’s settings and cookie information through the link below.',
        ],
      },
    ],
    resources: [
      {
        label: 'How Google uses cookies',
        href: 'https://policies.google.com/technologies/cookies',
      },
    ],
  },
  terms: {
    title: 'Terms of use',
    intro:
      'The essentials for browsing the site, exploring our menu, and using its links.',
    sections: [
      {
        id: 'site',
        title: 'Using this website',
        paragraphs: [
          'This website helps you discover Blabber All Day, browse dishes, find our outlets, and contact us. Please use it lawfully and do not interfere with its operation.',
        ],
      },
      {
        id: 'menu',
        title: 'Menus, images, and availability',
        paragraphs: [
          'Menu descriptions and images are for discovery. Dishes, ingredients, prices, offers, and availability can differ by outlet and ordering platform and may change. If an ingredient or allergen matters to you, confirm it with the outlet before ordering.',
        ],
      },
      {
        id: 'requests',
        title: 'Reservations and orders',
        paragraphs: [
          'A reservation request is not a confirmed booking until the outlet team confirms it. This website does not take payment. Order links open Zomato or Swiggy, and orders placed there are subject to that platform’s checkout, delivery, cancellation, and refund terms.',
        ],
      },
      {
        id: 'content',
        title: 'Site content and external links',
        paragraphs: [
          'The branding, photographs, text, and layout on this site are provided for personal browsing. Please ask before reusing them commercially. External services have their own availability and policies, which we do not control.',
          'We may update the site and these terms as the experience changes. The date below shows when this page was last revised.',
        ],
      },
    ],
  },
  reservations: {
    title: 'Reservations & orders',
    intro:
      'What happens after you ask for a table or choose an ordering partner.',
    sections: [
      {
        id: 'booking',
        title: 'Asking for a table',
        paragraphs: [
          'The reservation form prepares a WhatsApp message with the details you enter. You need to send the message in WhatsApp for us to receive your request. A table is confirmed only when the outlet team replies with confirmation.',
          'Availability can change. If your plans change, reply to the conversation or call the selected outlet so the team can help with a change or cancellation.',
        ],
      },
      {
        id: 'orders',
        title: 'Ordering through partners',
        paragraphs: [
          'The Order now options open the selected outlet’s menu on Zomato or Swiggy. You place and pay for an order on that platform, not on this website. The platform’s live menu, service area, prices, fees, checkout, and order terms apply.',
          'For an issue with a delivery order or a platform payment or refund, use the support options for the platform where you ordered. For questions about dining at an outlet, contact that outlet directly.',
        ],
      },
      {
        id: 'contacts',
        title: 'Outlet contacts',
        paragraphs: [
          'Juhu: +91 9967768775. Borivali: +91 8875409409. Thane: +91 7710079083.',
        ],
      },
    ],
  },
}

export { contactEmail }
export default legalPages
