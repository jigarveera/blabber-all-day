import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import faqs from '../../data/faqs'
import FaqItem from '../ui/FaqItem'

export default function FaqSection({ page = false }) {
  const [openIndex, setOpenIndex] = useState(null)
  const autoOpenTimerRef = useRef(null)
  const hasOpenedRef = useRef(false)
  const hasInteractedRef = useRef(false)
  const visibleFaqs = page ? faqs : faqs.slice(0, 3)
  const Heading = page ? 'h1' : 'h2'

  useEffect(() => () => window.clearTimeout(autoOpenTimerRef.current), [])

  const cancelAutoOpen = () => {
    window.clearTimeout(autoOpenTimerRef.current)
    autoOpenTimerRef.current = null
  }

  const scheduleAutoOpen = () => {
    if (hasOpenedRef.current || hasInteractedRef.current) return

    cancelAutoOpen()
    autoOpenTimerRef.current = window.setTimeout(() => {
      hasOpenedRef.current = true
      setOpenIndex(0)
    }, 1000)
  }

  return (
    <motion.section
      id="faq"
      aria-labelledby="faq-heading"
      onViewportEnter={scheduleAutoOpen}
      onViewportLeave={cancelAutoOpen}
      viewport={{ amount: 0.25 }}
      className={
        'relative isolate overflow-hidden px-5 sm:px-8 lg:px-12 ' +
        (page
          ? 'bg-[#f7f1ec] pb-20 pt-32 text-[#2b2029] sm:pb-28 sm:pt-40'
          : 'bg-[#493046] py-20 text-[#f8f1eb] sm:py-28')
      }
    >
      <div
        className={
          'pointer-events-none absolute inset-0 -z-10 ' +
          (page
            ? 'bg-[radial-gradient(circle_at_0%_0%,rgba(196,142,178,.18),transparent_38%),radial-gradient(circle_at_100%_100%,rgba(224,199,215,.25),transparent_55%)]'
            : 'bg-[radial-gradient(circle_at_0%_0%,rgba(196,142,178,.28),transparent_38%),radial-gradient(circle_at_100%_100%,rgba(27,17,28,.55),transparent_55%)]')
        }
      />
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)] lg:gap-16">
        <div className="lg:self-start">
          <div className="flex items-center gap-3 sm:gap-5">
            <Heading
              id="faq-heading"
              className="min-w-0 max-w-xl flex-1 font-['Cormorant_Garamond'] text-[clamp(3.5rem,7vw,6.5rem)] font-semibold leading-[.88] tracking-[-.045em]"
            >
              Good to{' '}
              <span
                className={
                  page ? 'italic text-[#a77497]' : 'italic text-[#e2afcc]'
                }
              >
                know.
              </span>
            </Heading>
            {!page && (
              <Link
                to="/faq"
                aria-label="View all FAQs"
                className="grid size-11 shrink-0 place-items-center rounded-full border border-[#d6a8c5] text-[#f8f1eb] transition hover:bg-[#aa769a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:size-12"
              >
                <ArrowUpRight
                  size={20}
                  aria-hidden="true"
                />
              </Link>
            )}
          </div>
        </div>

        <div
          className={
            'border-t ' +
            (page ? 'border-[#d9c4d1]' : 'border-[#caa2bc]/30')
          }
        >
          {visibleFaqs.map((faq, index) => (
            <FaqItem
              key={faq.question}
              question={faq.question}
              answer={faq.answer}
              index={index}
              open={openIndex === index}
              light={page}
              onToggle={() => {
                hasInteractedRef.current = true
                cancelAutoOpen()
                setOpenIndex((current) => (current === index ? null : index))
              }}
            />
          ))}
        </div>
      </div>
    </motion.section>
  )
}
