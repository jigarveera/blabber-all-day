import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Hand } from 'lucide-react'

export default function OutletCard({
  outlet,
  onSelect,
  showTouchHint = false,
}) {
  const [hintVisible, setHintVisible] = useState(showTouchHint)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (!showTouchHint) return undefined
    const timer = window.setTimeout(() => setHintVisible(false), 3000)
    return () => window.clearTimeout(timer)
  }, [showTouchHint])

  return (
    <motion.button
      type="button"
      layoutId={`outlet-${outlet.name}`}
      onClick={() => onSelect(outlet.name)}
      whileTap={reducedMotion ? undefined : { scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 260, damping: 28 }}
      aria-label={`Choose ${outlet.name} outlet`}
      className="group relative aspect-square w-full overflow-hidden rounded-[22px] border border-[#705466] bg-[#2b2429] text-white shadow-[0_16px_35px_rgba(0,0,0,.2)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d6a8c5]"
    >
      <img
        src={outlet.image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
      />
      <span className="absolute inset-0 bg-gradient-to-t from-[#191518]/85 via-transparent to-[#191518]/10" />
      <span className="absolute bottom-4 left-3 right-3 text-right font-['Cormorant_Garamond'] text-xl font-semibold leading-none sm:bottom-6 sm:left-6 sm:text-3xl">
        {outlet.name}
      </span>
      {hintVisible && (
        <motion.span
          aria-hidden="true"
          initial={{ opacity: 0, scale: 1.25 }}
          animate={
            reducedMotion
              ? { opacity: 1, scale: 1 }
              : {
                  opacity: [0, 1, 1, 0, 1, 1, 0],
                  scale: [1.25, 1, 0.86, 1.25, 1, 0.86, 1.25],
                }
          }
          transition={
            reducedMotion ? undefined : { duration: 3, ease: 'easeInOut' }
          }
          className="pointer-events-none absolute left-1/2 top-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/80 bg-[#aa769a]/90 text-white shadow-[0_0_0_8px_rgba(255,255,255,.22)] sm:size-14"
        >
          <Hand size={24} />
        </motion.span>
      )}
    </motion.button>
  )
}
