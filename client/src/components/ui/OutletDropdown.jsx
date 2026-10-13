import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import outlets from '../../data/outlets'

export default function OutletDropdown({ outlet, onSelect, compact = false }) {
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined

    const closeOnOutsideClick = (event) => {
      if (!dropdownRef.current?.contains(event.target)) setOpen(false)
    }
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('pointerdown', closeOnOutsideClick)
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsideClick)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [open])

  return (
    <div
      ref={dropdownRef}
      className={
        'z-30 transition-[top,right] duration-500 ease-in-out motion-reduce:transition-none ' +
        (compact
          ? 'fixed right-[76px] top-6 md:absolute md:right-6 md:top-24'
          : 'absolute right-3 top-3 sm:right-6 sm:top-6')
      }
    >
      <motion.button
        type="button"
        layoutId={`outlet-${outlet}`}
        transition={{ type: 'spring', stiffness: 260, damping: 28 }}
        onClick={() => setOpen((current) => !current)}
        aria-label={`Selected outlet: ${outlet}. Choose another outlet`}
        aria-expanded={open}
        aria-controls="outlet-dropdown"
        className={
          'inline-flex items-center gap-2 rounded-full border border-[#d6a8c5] bg-[#aa769a] font-bold uppercase tracking-[.12em] text-white shadow-[0_12px_28px_rgba(0,0,0,.3)] transition-[padding,font-size] duration-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transition-none ' +
          (compact
            ? 'px-3 py-2 text-[10px] md:px-4 md:py-2.5 md:text-xs'
            : 'px-4 py-2.5 text-xs sm:px-5 sm:py-3')
        }
      >
        <span>{outlet}</span>
        <ChevronDown
          size={16}
          className={
            open ? 'rotate-180 transition-transform' : 'transition-transform'
          }
        />
      </motion.button>
      <AnimatePresence>
        {open && (
          <motion.div
            id="outlet-dropdown"
            role="group"
            aria-label="Choose an outlet"
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="mt-2 w-44 origin-top-right overflow-hidden rounded-2xl border border-[#77576b] bg-[#241d20] p-1.5 text-white shadow-2xl"
          >
            {outlets.map((option) => (
              <button
                key={option.name}
                type="button"
                onClick={() => {
                  onSelect(option.name)
                  setOpen(false)
                }}
                aria-pressed={outlet === option.name}
                className={
                  'flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left text-sm transition hover:bg-[#4a3543] ' +
                  (outlet === option.name ? 'bg-[#4a3543]' : '')
                }
              >
                <img
                  src={option.image}
                  alt=""
                  className="size-9 rounded-lg object-cover"
                />
                <span>{option.name}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
