import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'

const slideVariants = {
  enter: (direction) => ({ opacity: 0, x: `${direction * 18}%`, scale: 1.035 }),
  center: { opacity: 1, x: '0%', scale: 1 },
  exit: (direction) => ({ opacity: 0, x: `${direction * -12}%`, scale: 1 }),
}

export default function GalleryTile({
  slides,
  label,
  interval,
  index,
  className,
}) {
  const tileRef = useRef(null)
  const pauseTimer = useRef(null)
  const inView = useInView(tileRef, { amount: 0.3 })
  const reducedMotion = useReducedMotion()
  const [active, setActive] = useState(0)
  const [direction, setDirection] = useState(1)
  const [paused, setPaused] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)

  useEffect(() => {
    if (!inView || reducedMotion || paused || hovered || focused) return undefined

    const timer = window.setTimeout(() => {
      setDirection(1)
      setActive((current) => (current + 1) % slides.length)
    }, interval)

    return () => window.clearTimeout(timer)
  }, [active, focused, hovered, inView, interval, paused, reducedMotion, slides.length])

  useEffect(() => {
    if (!inView) return undefined
    const nextImage = new Image()
    nextImage.src = slides[(active + 1) % slides.length].src
    return undefined
  }, [active, inView, slides])

  useEffect(() => () => window.clearTimeout(pauseTimer.current), [])

  function pauseAfterInteraction() {
    setPaused(true)
    window.clearTimeout(pauseTimer.current)
    pauseTimer.current = window.setTimeout(() => setPaused(false), 7000)
  }

  function move(step) {
    setDirection(step)
    setActive((current) => (current + step + slides.length) % slides.length)
    pauseAfterInteraction()
  }

  function handleDragEnd(_, info) {
    if (info.offset.x < -45) move(1)
    if (info.offset.x > 45) move(-1)
  }

  return (
    <motion.div
      ref={tileRef}
      role="group"
      aria-roledescription="carousel"
      aria-label={`${label}. Use the left and right arrow keys to browse images.`}
      tabIndex={0}
      initial={reducedMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={
        reducedMotion
          ? { duration: 0 }
          : { duration: 0.65, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }
      }
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false)
      }}
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft') {
          event.preventDefault()
          move(-1)
        }
        if (event.key === 'ArrowRight') {
          event.preventDefault()
          move(1)
        }
      }}
      className={`group relative isolate overflow-hidden rounded-[24px] bg-[#342630] shadow-[0_20px_50px_rgba(43,32,41,.12)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#aa769a] sm:rounded-[30px] ${className}`}
    >
      <AnimatePresence
        initial={false}
        custom={direction}
      >
        <motion.div
          key={slides[active].src}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={
            reducedMotion
              ? { duration: 0 }
              : { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
          }
          drag={reducedMotion ? false : 'x'}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.14}
          dragMomentum={false}
          onDragEnd={handleDragEnd}
          className="absolute inset-0 cursor-grab touch-pan-y active:cursor-grabbing"
        >
          <img
            src={slides[active].src}
            alt={slides[active].alt}
            draggable="false"
            className="pointer-events-none h-full w-full select-none object-cover transition-transform duration-700 group-hover:scale-[1.025]"
          />
        </motion.div>
      </AnimatePresence>

    </motion.div>
  )
}
