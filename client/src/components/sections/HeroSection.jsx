import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import HeroAction from '../ui/HeroAction'

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function HeroSection() {
  const sectionRef = useRef(null)
  const reducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.12])
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '-4%'])

  return (
    <section
      id="home-hero"
      ref={sectionRef}
      data-header-theme="dark"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[#211b20] text-[#f8f2ec]"
    >
      <motion.img
        src="/images/hero-restaurant.webp"
        alt="A table set for a long day at Blabber All Day"
        fetchPriority="high"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-[54%_center] sm:object-center"
        style={reducedMotion ? undefined : { scale: imageScale, y: imageY }}
      />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(0deg,rgba(20,13,19,.92)_0%,rgba(28,19,27,.68)_42%,rgba(24,18,22,.30)_100%)] sm:bg-[linear-gradient(90deg,rgba(20,13,19,.82)_0%,rgba(24,18,22,.58)_45%,rgba(24,18,22,.22)_100%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_82%_12%,rgba(214,168,197,.16),transparent_35%)]" />

      <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-5 pb-16 pt-32 sm:px-8 lg:px-12">
        <motion.div
          initial={reducedMotion ? false : 'hidden'}
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { delayChildren: 0.15, staggerChildren: 0.16 } },
          }}
        >
          <motion.p
            variants={reveal}
            className="mb-4 text-[11px] font-bold uppercase tracking-[.26em] text-[#edcbe0] sm:mb-6"
          >
            Blabber All Day · Mumbai
          </motion.p>
          <h1 className="max-w-5xl font-['Cormorant_Garamond'] text-[clamp(3.8rem,12vw,9.5rem)] font-semibold leading-[.78] tracking-[-.055em]">
            <motion.span
              variants={reveal}
              className="block"
            >
              Come hungry.
            </motion.span>
            <motion.span
              variants={reveal}
              className="block italic text-[#e8bfd7]"
            >
              Stay for the stories.
            </motion.span>
          </h1>
          <div className="mt-9 grid w-full gap-3 sm:mt-12 sm:grid-cols-2 sm:gap-4">
            <motion.div variants={reveal}>
              <HeroAction to="/menu">Order now</HeroAction>
            </motion.div>
            <motion.div variants={reveal}>
              <HeroAction
                to="/outlet"
                variant="light"
              >
                Visit now
              </HeroAction>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
