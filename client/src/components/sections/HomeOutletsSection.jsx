import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import outlets from '../../data/outlets'
import OutletLocationCard from '../ui/OutletLocationCard'

export default function HomeOutletsSection() {
  const stackRef = useRef(null)
  const reducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: stackRef,
    offset: ['start start', 'end end'],
  })

  const firstScale = useTransform(
    scrollYProgress,
    [0, 0.12, 0.48, 0.55, 0.88, 1],
    [1, 1, 0.94, 0.94, 0.88, 0.88],
  )
  const firstY = useTransform(
    scrollYProgress,
    [0, 0.12, 0.48, 0.55, 0.88, 1],
    [0, 0, -24, -24, -48, -48],
  )
  const secondY = useTransform(
    scrollYProgress,
    [0, 0.12, 0.48, 0.55, 0.88, 1],
    ['120vh', '120vh', '0vh', '0vh', '-3vh', '-3vh'],
  )
  const secondScale = useTransform(
    scrollYProgress,
    [0, 0.55, 0.88, 1],
    [1, 1, 0.95, 0.95],
  )
  const thirdY = useTransform(
    scrollYProgress,
    [0, 0.55, 0.88, 1],
    ['120vh', '120vh', '0vh', '0vh'],
  )
  const cardStyles = [
    { scale: firstScale, y: firstY },
    { scale: secondScale, y: secondY },
    { y: thirdY },
  ]
  const heading = (
    <h2
      id="home-outlets-heading"
      className="mx-auto max-w-5xl font-['Cormorant_Garamond'] text-[clamp(2.75rem,11vw,3.8rem)] font-semibold leading-[.85] tracking-[-.05em] md:text-[clamp(3.8rem,8vw,8rem)]"
    >
      Find a place to <span className="italic text-[#d6a8c5]">linger.</span>
    </h2>
  )

  return (
    <section
      data-header-theme="dark"
      aria-labelledby="home-outlets-heading"
      className="relative bg-[#251b24] text-[#f8f2ec]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_15%,rgba(170,118,154,.22),transparent_42%),radial-gradient(circle_at_100%_70%,rgba(116,67,99,.28),transparent_45%)]" />
      {reducedMotion ? (
        <div
          ref={stackRef}
          className="relative pb-24"
        >
          <div className="sticky top-0 z-10 bg-[#251b24] px-5 pb-5 pt-[104px] text-center sm:px-8 lg:px-12">
            {heading}
          </div>
          <div className="relative mx-auto grid max-w-[460px] gap-5 px-5 sm:px-8">
            {outlets.map((outlet, index) => (
              <OutletLocationCard
                key={outlet.slug}
                outlet={outlet}
                index={index}
                headingLevel="h3"
                compact
              />
            ))}
          </div>
        </div>
      ) : (
        <div
          ref={stackRef}
          className="relative h-[280svh]"
        >
          <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden px-5 pb-6 pt-[104px] sm:px-8 lg:px-12">
            <div className="relative z-10 mx-auto w-full max-w-7xl text-center">
              {heading}
            </div>
            <div className="relative mx-auto flex min-h-0 w-full max-w-[420px] flex-1 items-center justify-center">
              {outlets.map((outlet, index) => (
                <div
                  key={outlet.slug}
                  className="pointer-events-none absolute inset-0 flex items-center justify-center"
                  style={{ zIndex: index + 1 }}
                >
                  <motion.div
                    className="pointer-events-auto w-full origin-center will-change-transform"
                    style={cardStyles[index]}
                  >
                    <OutletLocationCard
                      outlet={outlet}
                      index={index}
                      headingLevel="h3"
                      compact
                    />
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
