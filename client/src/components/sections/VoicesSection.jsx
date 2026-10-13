import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import CarouselControl from '../ui/CarouselControl'
import ReelCard from '../ui/ReelCard'
import ReviewCard from '../ui/ReviewCard'
import reel01 from '../../assets/reel/blabber_reel_01.mp4'
import reel02 from '../../assets/reel/blabber_reel_02.mp4'
import reel03 from '../../assets/reel/blabber_reel_03.mp4'
import reel04 from '../../assets/reel/blabber_reel_04.mp4'

const stories = [
  {
    type: 'review',
    id: 'google-review-juhu-prateek',
    review: {
      author: 'Prateek Bajpai',
      outlet: 'Juhu',
      quote:
        'Absolutely loved the food, the ambiance and the service. The Gnocchi pasta was a big highlight for us.',
      sourceUrl: 'https://restaurant-guru.in/Blabber-All-day-Juhu-Mumbai',
    },
  },
  {
    type: 'reel',
    id: 'reel-01',
    number: '01',
    videoSrc: reel01,
    poster: '/images/food-1.webp',
    instagramUrl:
      'https://www.instagram.com/reel/DaXeIx0IHWg/?utm_source=ig_web_copy_link&exln=MzRlODBiNWFlZA==&srtk=MzRlODBiNWFlZA==',
  },
  {
    type: 'review',
    id: 'google-review-borivali-atharv',
    review: {
      author: 'Atharv Singh',
      outlet: 'Borivali',
      quote:
        'Good food and relaxed ambience made the visit to Blabber All Day Borivali really enjoyable.',
      sourceUrl: 'https://restaurant-guru.in/Blabber-All-Day-Mumbai',
    },
  },
  {
    type: 'reel',
    id: 'reel-02',
    number: '02',
    videoSrc: reel02,
    poster: '/images/food-2.webp',
    instagramUrl:
      'https://www.instagram.com/reel/DWTFrofjRyF/?utm_source=ig_web_copy_link&mdxt=MzRlODBiNWFlZA==&srtk=MzRlODBiNWFlZA==',
  },
  {
    type: 'review',
    id: 'google-review-thane-salim',
    review: {
      author: 'Salim Khan',
      outlet: 'Thane',
      quote:
        'Blabber All Day Thane is truly a gem, offering an experience that goes above and beyond!',
      sourceUrl: 'https://restaurant-guru.in/Blabber-All-Day-Thane-Thane',
    },
  },
  {
    type: 'reel',
    id: 'reel-03',
    number: '03',
    videoSrc: reel03,
    poster: '/images/hero-restaurant-3.webp',
    instagramUrl:
      'https://www.instagram.com/reel/DZSNAlwtXGR/?utm_source=ig_web_copy_link&rpxt=MzRlODBiNWFlZA==&srtk=MzRlODBiNWFlZA==',
  },
  {
    type: 'review',
    id: 'google-review-juhu-guru',
    review: {
      author: 'Guru B',
      outlet: 'Juhu',
      quote:
        'Had an amazing time at Blabber Juhu! The ambience is vibrant, the food is delicious, and the staff is super courteous.',
      sourceUrl:
        'https://wanderlog.com/list/geoCategory/63273/best-new-restaurants-to-visit-in-mumbai',
    },
  },
  {
    type: 'reel',
    id: 'reel-04',
    number: '04',
    videoSrc: reel04,
    poster: '/images/hero-restaurant-4.webp',
    instagramUrl:
      'https://www.instagram.com/reel/DUDnHwvCNiQ/?utm_source=ig_web_copy_link&psln=MzRlODBiNWFlZA==&srtk=MzRlODBiNWFlZA==',
  },
]

const wrap = (value) => (value + stories.length) % stories.length

export default function VoicesSection() {
  const sectionRef = useRef(null)
  const stageRef = useRef(null)
  const touchStartRef = useRef(null)
  const ignoreClickRef = useRef(false)
  const manualTimerRef = useRef(null)
  const manualElapsedRef = useRef(false)
  const videoEndedRef = useRef(false)
  const activeIndexRef = useRef(0)
  const [stageWidth, setStageWidth] = useState(0)
  const [activeIndex, setActiveIndex] = useState(0)
  const [manual, setManual] = useState(false)
  const [playbackToken, setPlaybackToken] = useState(0)
  const reducedMotion = useReducedMotion()

  useLayoutEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    setStageWidth(stage.getBoundingClientRect().width)
    const observer = new ResizeObserver(([entry]) => {
      setStageWidth(entry.contentRect.width)
    })
    observer.observe(stage)
    return () => observer.disconnect()
  }, [])

  const advance = useCallback((direction = 1) => {
    window.clearTimeout(manualTimerRef.current)
    manualElapsedRef.current = false
    videoEndedRef.current = false
    setManual(false)
    setActiveIndex((current) => {
      const next = wrap(current + direction)
      activeIndexRef.current = next
      return next
    })
  }, [])

  const selectStory = useCallback(
    (index) => {
      window.clearTimeout(manualTimerRef.current)
      activeIndexRef.current = index
      manualElapsedRef.current = false
      videoEndedRef.current = false
      setActiveIndex(index)
      setManual(true)
      setPlaybackToken((current) => current + 1)
      manualTimerRef.current = window.setTimeout(() => {
        manualElapsedRef.current = true
        if (stories[index].type === 'review' || videoEndedRef.current) advance()
      }, 5000)
    },
    [advance],
  )

  useEffect(() => {
    if (manual) return undefined
    const timeout = window.setTimeout(
      () => advance(),
      stories[activeIndex].type === 'review' ? 2000 : 8000,
    )
    return () => window.clearTimeout(timeout)
  }, [activeIndex, advance, manual])

  useEffect(() => {
    const handleOutsidePointer = (event) => {
      if (sectionRef.current?.contains(event.target)) return
      window.clearTimeout(manualTimerRef.current)
      manualElapsedRef.current = false
      videoEndedRef.current = false
      setManual(false)
    }
    document.addEventListener('pointerdown', handleOutsidePointer)
    return () => {
      document.removeEventListener('pointerdown', handleOutsidePointer)
      window.clearTimeout(manualTimerRef.current)
    }
  }, [])

  const onVideoEnded = (index) => {
    if (!manual || index !== activeIndexRef.current) return
    videoEndedRef.current = true
    if (manualElapsedRef.current) advance()
  }

  const onPointerDown = (event) => {
    touchStartRef.current = { x: event.clientX, y: event.clientY }
  }

  const onPointerUp = (event) => {
    const start = touchStartRef.current
    touchStartRef.current = null
    if (!start) return
    const dx = event.clientX - start.x
    const dy = event.clientY - start.y
    if (Math.abs(dx) < 45 || Math.abs(dx) < Math.abs(dy)) return
    ignoreClickRef.current = true
    window.setTimeout(() => {
      ignoreClickRef.current = false
    }, 0)
    selectStory(wrap(activeIndexRef.current + (dx < 0 ? 1 : -1)))
  }

  const onWheel = (event) => {
    if (
      Math.abs(event.deltaX) <= Math.abs(event.deltaY) ||
      Math.abs(event.deltaX) < 20
    )
      return
    selectStory(wrap(activeIndexRef.current + (event.deltaX > 0 ? 1 : -1)))
  }

  const isPhone = stageWidth < 640
  const sideWidth = isPhone
    ? Math.max(1, (stageWidth - 32) / 1.3)
    : Math.min(360, Math.max(1, (stageWidth - 32) / 3.1))
  const centerWidth = sideWidth * 1.1
  const sideHeight = isPhone ? 390 : 420
  const centerHeight = sideHeight * 1.1 * 1.2
  const stageHeight = centerHeight + 20
  const centerLeft = (stageWidth - centerWidth) / 2

  return (
    <section
      ref={sectionRef}
      data-header-theme="light"
      aria-labelledby="voices-heading"
      className="overflow-hidden bg-[#fffaf5] py-16 text-[#241d20] sm:py-24"
    >
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <h2
          id="voices-heading"
          className="text-center font-['Cormorant_Garamond'] text-5xl font-semibold leading-[.95] tracking-tight sm:text-6xl"
        >
          Word on the <span className="italic text-[#a46e91]">plate.</span>
        </h2>
        <div className="absolute right-8 top-1/2 hidden -translate-y-1/2 gap-2 lg:flex">
          <CarouselControl
            direction="previous"
            onClick={() => selectStory(wrap(activeIndexRef.current - 1))}
          />
          <CarouselControl
            direction="next"
            onClick={() => selectStory(wrap(activeIndexRef.current + 1))}
          />
        </div>
      </div>
      <div
        ref={stageRef}
        role="region"
        aria-roledescription="carousel"
        aria-label="Google review and Blabber reels"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onWheel={onWheel}
        className="relative mx-auto mt-9 w-full max-w-[1200px] overflow-hidden touch-pan-y select-none"
        style={{ height: stageHeight }}
      >
        {stageWidth > 0 &&
          stories.map((story, index) => {
            let offset = index - activeIndex
            if (offset > 2) offset -= stories.length
            if (offset < -2) offset += stories.length
            const isActive = offset === 0
            const width = isActive ? centerWidth : sideWidth
            const left =
              offset === 0
                ? centerLeft
                : offset < 0
                  ? centerLeft -
                    16 -
                    sideWidth +
                    (offset + 1) * (sideWidth + 16)
                  : centerLeft +
                    centerWidth +
                    16 +
                    (offset - 1) * (sideWidth + 16)
            const height = isActive ? centerHeight : sideHeight

            return (
              <motion.div
                key={story.id}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${stories.length}: ${story.type === 'review' ? 'Google review' : `Blabber reel ${story.number}`}`}
                aria-hidden={Math.abs(offset) > 1}
                inert={Math.abs(offset) > 1}
                tabIndex={Math.abs(offset) > 1 ? -1 : 0}
                onClick={() => {
                  if (!ignoreClickRef.current) selectStory(index)
                }}
                onKeyDown={(event) => {
                  if (event.target !== event.currentTarget) return
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    selectStory(index)
                  }
                }}
                initial={false}
                animate={{
                  left,
                  top: (stageHeight - height) / 2,
                  width,
                  height,
                  opacity: Math.abs(offset) > 1 ? 0 : 1,
                }}
                transition={
                  reducedMotion
                    ? { duration: 0 }
                    : {
                        type: 'spring',
                        stiffness: 160,
                        damping: 24,
                        mass: 0.85,
                      }
                }
                style={{
                  position: 'absolute',
                  zIndex: isActive ? 3 : Math.abs(offset) === 1 ? 2 : 1,
                  cursor: 'pointer',
                  pointerEvents: Math.abs(offset) > 1 ? 'none' : 'auto',
                }}
              >
                {story.type === 'review' ? (
                  <ReviewCard review={story.review} />
                ) : (
                  <ReelCard
                    reel={story}
                    active={isActive}
                    manual={manual}
                    playbackToken={playbackToken}
                    onEnded={() => onVideoEnded(index)}
                  />
                )}
              </motion.div>
            )
          })}
      </div>
    </section>
  )
}
