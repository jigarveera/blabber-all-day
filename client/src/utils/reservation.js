import outlets from '../data/outlets'

const mumbaiFormatter = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Asia/Kolkata',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
})

export function getMumbaiNow(now = new Date()) {
  const parts = Object.fromEntries(
    mumbaiFormatter.formatToParts(now).map(({ type, value }) => [type, value]),
  )

  return {
    date: `${parts.year}-${parts.month}-${parts.day}`,
    time: `${parts.hour}:${parts.minute}`,
  }
}

export function normalisePhone(value) {
  return value.replace(/[\s()-]/g, '')
}

function isValidDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false
  const date = new Date(`${value}T00:00:00Z`)
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value
}

function isValidTime(value) {
  if (!/^\d{2}:\d{2}$/.test(value)) return false
  const [hours, minutes] = value.split(':').map(Number)
  return hours < 24 && minutes < 60
}

export function validateReservation(values, now = new Date()) {
  const errors = {}
  const current = getMumbaiNow(now)
  const name = values.name.trim()
  const phone = normalisePhone(values.phone)
  const guests = Number(values.guests)

  if (name.length < 2 || name.length > 60) {
    errors.name = 'Enter your name (2–60 characters).'
  }

  if (!outlets.some((outlet) => outlet.slug === values.outlet)) {
    errors.outlet = 'Choose an outlet.'
  }

  if (!isValidDate(values.date)) {
    errors.date = 'Choose a valid date.'
  } else if (values.date < current.date) {
    errors.date = 'Choose today or a future date.'
  }

  if (!isValidTime(values.time)) {
    errors.time = 'Choose a valid time.'
  } else if (values.date === current.date && values.time <= current.time) {
    errors.time = 'Choose a later time today.'
  }

  if (
    !/^\d+$/.test(values.guests) ||
    !Number.isInteger(guests) ||
    guests < 1 ||
    guests > 99
  ) {
    errors.guests = 'Enter a party size from 1 to 99.'
  }

  if (!/^(?:[6-9]\d{9}|\+[1-9]\d{9,14})$/.test(phone)) {
    errors.phone = 'Enter a valid mobile number with country code if needed.'
  }

  if (values.note.trim().length > 500) {
    errors.note = 'Keep your note under 500 characters.'
  }

  return errors
}

export function createReservationMessage(values) {
  const outlet = outlets.find((item) => item.slug === values.outlet)
  const formattedDate = new Intl.DateTimeFormat('en-IN', {
    timeZone: 'UTC',
    weekday: 'short',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(`${values.date}T12:00:00Z`))
  const lines = [
    'Hello Blabber All Day, I would like to request a table.',
    '',
    `Outlet: ${outlet.name}`,
    `Date: ${formattedDate}`,
    `Time: ${values.time} IST`,
    `Guests: ${values.guests}`,
    `Name: ${values.name.trim()}`,
    `Phone: ${normalisePhone(values.phone)}`,
  ]

  if (values.note.trim()) lines.push(`Note: ${values.note.trim()}`)
  lines.push('', 'Please let me know if a table is available. Thank you!')

  return lines.join('\n')
}
