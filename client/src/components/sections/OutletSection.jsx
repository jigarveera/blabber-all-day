import { motion } from 'framer-motion'
import outlets from '../../data/outlets'
import OutletCard from '../ui/OutletCard'

export default function OutletSection({ onSelect }) {
  return (
    <motion.section
      initial={false}
      exit={{ height: 0, opacity: 0, paddingBottom: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto max-w-7xl overflow-hidden px-5 pb-7 sm:px-8 lg:px-12"
    >
      <h2 className="mb-4 font-['Cormorant_Garamond'] text-3xl font-semibold text-[#f5ede3] sm:text-4xl">
        Choose your outlet
      </h2>
      <div
        className="grid grid-cols-3 gap-2 sm:gap-4"
        role="group"
        aria-label="Blabber All Day outlets"
      >
        {outlets.map((outlet, index) => (
          <OutletCard
            key={outlet.name}
            outlet={outlet}
            onSelect={onSelect}
            showTouchHint={index === 0}
          />
        ))}
      </div>
    </motion.section>
  )
}
