export const INSTAGRAM_URL = 'https://www.instagram.com/blabberallday/'

export const WHATSAPP_PHONE = '917208543098'

const whatsappMessage =
  "Hi Blabber All Day! I'd love to visit. Could you help me with a table and the latest menu?"

export const WHATSAPP_URL =
  `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${encodeURIComponent(whatsappMessage)}`
