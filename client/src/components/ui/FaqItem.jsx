import { motion, useReducedMotion } from 'framer-motion'
import { Plus } from 'lucide-react'

export default function FaqItem({
  question,
  answer,
  index,
  open,
  onToggle,
  light = false,
}) {
  const reducedMotion = useReducedMotion()
  const questionId = `faq-question-${index}`
  const answerId = `faq-answer-${index}`

  return (
    <div className={light ? 'border-b border-[#d9c4d1]' : 'border-b border-[#caa2bc]/30'}>
      <h3>
        <button
          id={questionId}
          type="button"
          aria-expanded={open}
          aria-controls={answerId}
          onClick={onToggle}
          className={
            'group flex w-full items-start gap-4 py-6 text-left focus-visible:outline-2 focus-visible:outline-offset-2 sm:gap-6 sm:py-7 ' +
            (light
              ? 'text-[#2b2029] focus-visible:outline-[#a77497]'
              : 'text-[#f8f1eb] focus-visible:outline-[#e8bfd8]')
          }
        >
          <span
            className={
              'pt-1 text-xs font-bold tracking-[.15em] ' +
              (light ? 'text-[#9a6689]' : 'text-[#d6a8c5]')
            }
          >
            {String(index + 1).padStart(2, '0')}
          </span>
          <span
            className={
              "min-w-0 flex-1 font-['Cormorant_Garamond'] text-[clamp(1.5rem,3vw,2.1rem)] font-semibold leading-[1.08] transition-colors " +
              (light ? 'group-hover:text-[#9a6689]' : 'group-hover:text-[#e7bbd5]')
            }
          >
            {question}
          </span>
          <span
            className={
              'grid size-9 shrink-0 place-items-center rounded-full border sm:size-10 ' +
              (light
                ? 'border-[#ba88a9] text-[#8d5c7d]'
                : 'border-[#ba88a9]/70 text-[#e6bfd5]')
            }
          >
            <Plus
              size={19}
              aria-hidden="true"
              className={
                'transition-transform duration-500 ease-out ' +
                (open ? 'rotate-45' : 'rotate-0')
              }
            />
          </span>
        </button>
      </h3>
      <motion.div
        id={answerId}
        role="region"
        aria-labelledby={questionId}
        aria-hidden={!open}
        inert={!open}
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={
          reducedMotion
            ? { duration: 0 }
            : { duration: open ? 0.7 : 0.45, ease: [0.16, 1, 0.3, 1] }
        }
        className="overflow-hidden"
      >
        <p
          className={
            'max-w-2xl pb-6 pl-8 pr-12 text-sm leading-7 sm:pb-7 sm:pl-11 sm:text-base ' +
            (light ? 'text-[#65545f]' : 'text-[#dfcbd8]')
          }
        >
          {answer}
        </p>
      </motion.div>
    </div>
  )
}
