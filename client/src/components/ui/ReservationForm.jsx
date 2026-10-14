import { useId, useRef, useState } from 'react'
import { ArrowUpRight, CalendarDays } from 'lucide-react'
import { Link } from 'react-router-dom'
import outlets from '../../data/outlets'
import { WHATSAPP_PHONE } from '../../data/socials'
import {
  createReservationMessage,
  getMumbaiNow,
  validateReservation,
} from '../../utils/reservation'
import WhatsAppIcon from './WhatsAppIcon'

const inputClass =
  'min-h-13 w-full rounded-[14px] border border-[#d9cbd4] bg-[#fffdfb] px-4 py-3 text-sm text-[#2b2029] outline-none transition placeholder:text-[#9c8d97] focus:border-[#aa769a] focus:ring-2 focus:ring-[#aa769a]/20 aria-invalid:border-[#b14264] aria-invalid:focus:ring-[#b14264]/15'

function Field({ id, label, error, hint, required = false, children }) {
  return (
    <div className="min-w-0">
      <label
        htmlFor={id}
        className="mb-2 block text-[11px] font-bold uppercase tracking-[.13em] text-[#5e4858]"
      >
        {label}
        {required && <span className="ml-1 text-[#aa769a]">*</span>}
      </label>
      {children}
      {error ? (
        <p
          id={`${id}-help`}
          className="mt-1.5 text-xs text-[#a82d54]"
        >
          {error}
        </p>
      ) : (
        hint && (
          <p
            id={`${id}-help`}
            className="mt-1.5 text-xs text-[#887882]"
          >
            {hint}
          </p>
        )
      )}
    </div>
  )
}

export default function ReservationForm({ defaultOutlet = '' }) {
  const formId = useId()
  const formRef = useRef(null)
  const [values, setValues] = useState({
    name: '',
    phone: '',
    outlet: outlets.some((item) => item.slug === defaultOutlet)
      ? defaultOutlet
      : '',
    guests: '2',
    date: '',
    time: '',
    note: '',
  })
  const [touched, setTouched] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [handoffUrl, setHandoffUrl] = useState('')
  const errors = validateReservation(values)
  const minDate = getMumbaiNow().date

  const id = (name) => `${formId}-${name}`
  const errorFor = (name) =>
    (submitted || touched[name]) && errors[name] ? errors[name] : ''
  const describedBy = (name) =>
    errorFor(name) || name === 'phone' || name === 'note'
      ? `${id(name)}-help`
      : undefined

  function update(name, value) {
    setValues((current) => ({ ...current, [name]: value }))
    setHandoffUrl('')
  }

  function handleSubmit(event) {
    event.preventDefault()
    setSubmitted(true)

    const currentErrors = validateReservation(values)
    const firstInvalid = [
      'name',
      'phone',
      'outlet',
      'guests',
      'date',
      'time',
      'note',
    ].find((field) => currentErrors[field])
    if (firstInvalid) {
      formRef.current?.elements.namedItem(firstInvalid)?.focus()
      return
    }

    const url = `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${encodeURIComponent(createReservationMessage(values))}`
    setHandoffUrl(url)
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="rounded-[30px] border border-[#e7dce3] bg-[#f9f5f1] p-5 shadow-[0_28px_80px_rgba(43,32,41,.14)] sm:p-8 lg:p-10">
      <div className="mb-8 flex items-start justify-between gap-4 border-b border-[#e7dce3] pb-6">
        <div>
          <h3 className="font-['Cormorant_Garamond'] text-4xl font-semibold leading-none text-[#2b2029] sm:text-5xl">
            Reserve your <span className="italic text-[#aa769a]">table.</span>
          </h3>
        </div>
        <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#ead9e4] text-[#885d79]">
          <CalendarDays
            size={21}
            strokeWidth={1.6}
          />
        </span>
      </div>

      <form
        ref={formRef}
        noValidate
        onSubmit={handleSubmit}
        className="grid gap-x-4 gap-y-5 sm:grid-cols-2"
      >
        <Field
          id={id('name')}
          label="Your name"
          error={errorFor('name')}
          required
        >
          <input
            id={id('name')}
            name="name"
            type="text"
            autoComplete="name"
            maxLength={60}
            value={values.name}
            onChange={(event) => update('name', event.target.value)}
            onBlur={() => setTouched((current) => ({ ...current, name: true }))}
            placeholder="Name for the table"
            aria-invalid={Boolean(errorFor('name'))}
            aria-describedby={describedBy('name')}
            className={inputClass}
            required
          />
        </Field>

        <Field
          id={id('phone')}
          label="Mobile number"
          error={errorFor('phone')}
          hint="Add a country code if outside India."
          required
        >
          <input
            id={id('phone')}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            maxLength={22}
            value={values.phone}
            onChange={(event) => update('phone', event.target.value)}
            onBlur={() => setTouched((current) => ({ ...current, phone: true }))}
            placeholder="+91 98765 43210"
            aria-invalid={Boolean(errorFor('phone'))}
            aria-describedby={describedBy('phone')}
            className={inputClass}
            required
          />
        </Field>

        <Field
          id={id('outlet')}
          label="Choose an outlet"
          error={errorFor('outlet')}
          required
        >
          <select
            id={id('outlet')}
            name="outlet"
            value={values.outlet}
            onChange={(event) => update('outlet', event.target.value)}
            onBlur={() => setTouched((current) => ({ ...current, outlet: true }))}
            aria-invalid={Boolean(errorFor('outlet'))}
            aria-describedby={describedBy('outlet')}
            className={inputClass}
            required
          >
            <option value="">Select your place</option>
            {outlets.map((outlet) => (
              <option
                key={outlet.slug}
                value={outlet.slug}
              >
                {outlet.name}
              </option>
            ))}
          </select>
        </Field>

        <Field
          id={id('guests')}
          label="Guests"
          error={errorFor('guests')}
          required
        >
          <input
            id={id('guests')}
            name="guests"
            type="number"
            inputMode="numeric"
            min="1"
            max="99"
            step="1"
            value={values.guests}
            onChange={(event) => update('guests', event.target.value)}
            onBlur={() => setTouched((current) => ({ ...current, guests: true }))}
            aria-invalid={Boolean(errorFor('guests'))}
            aria-describedby={describedBy('guests')}
            className={inputClass}
            required
          />
        </Field>

        <Field
          id={id('date')}
          label="Date"
          error={errorFor('date')}
          required
        >
          <input
            id={id('date')}
            name="date"
            type="date"
            min={minDate}
            value={values.date}
            onChange={(event) => update('date', event.target.value)}
            onBlur={() => setTouched((current) => ({ ...current, date: true }))}
            aria-invalid={Boolean(errorFor('date'))}
            aria-describedby={describedBy('date')}
            className={inputClass}
            required
          />
        </Field>

        <Field
          id={id('time')}
          label="Time · IST"
          error={errorFor('time')}
          required
        >
          <input
            id={id('time')}
            name="time"
            type="time"
            value={values.time}
            onChange={(event) => update('time', event.target.value)}
            onBlur={() => setTouched((current) => ({ ...current, time: true }))}
            aria-invalid={Boolean(errorFor('time'))}
            aria-describedby={describedBy('time')}
            className={inputClass}
            required
          />
        </Field>

        <div className="sm:col-span-2">
          <Field
            id={id('note')}
            label="Anything we should know?"
            error={errorFor('note')}
            hint="Optional · up to 500 characters"
          >
            <textarea
              id={id('note')}
              name="note"
              rows="3"
              maxLength={500}
              value={values.note}
              onChange={(event) => update('note', event.target.value)}
              onBlur={() => setTouched((current) => ({ ...current, note: true }))}
              placeholder="A celebration, a quieter corner, or a little detail..."
              aria-invalid={Boolean(errorFor('note'))}
              aria-describedby={describedBy('note')}
              className={`${inputClass} resize-y`}
            />
          </Field>
        </div>

        <div className="sm:col-span-2">
          <button
            type="submit"
            className="group flex min-h-14 w-full items-center justify-center gap-3 rounded-[16px] bg-[#9d6d8f] px-6 py-3 text-xs font-bold uppercase tracking-[.13em] text-white transition hover:bg-[#825775] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#825775]"
          >
            Continue on WhatsApp
            <WhatsAppIcon size={19} />
            <ArrowUpRight
              size={16}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </button>
          <p className="mt-3 text-center text-xs leading-relaxed text-[#73616d]">
            Send the prepared message to request your table. Your reservation is
            confirmed only when our team replies.{' '}
            <Link
              to="/privacy-policy"
              className="font-semibold text-[#885d79] underline underline-offset-2"
            >
              Privacy policy
            </Link>
            .
          </p>
          {handoffUrl && (
            <p
              role="status"
              className="mt-3 text-center text-xs leading-relaxed text-[#5e4858]"
            >
              WhatsApp didn’t open?{' '}
              <a
                href={handoffUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[#885d79] underline underline-offset-2"
              >
                Open your prepared request
              </a>
              .
            </p>
          )}
        </div>
      </form>
    </div>
  )
}
