import { useLayoutEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { WHATSAPP_URL } from '../../data/socials'
import WhatsAppIcon from './WhatsAppIcon'

export default function FloatingWhatsApp() {
  const { pathname } = useLocation()
  const [visible, setVisible] = useState(pathname !== '/')
  const lastY = useRef(0)
  const upwardTravel = useRef(0)
  const heroPassed = useRef(false)
  const reducedMotion = useReducedMotion()

  useLayoutEffect(() => {
    lastY.current = window.scrollY
    upwardTravel.current = 0
    heroPassed.current = false

    const onScroll = () => {
      const currentY = Math.max(0, window.scrollY)
      const difference = currentY - lastY.current
      const pastHero =
        pathname !== '/' ||
        (document.getElementById('home-hero')?.getBoundingClientRect().bottom ??
          1) <= 0

      if (!pastHero) {
        setVisible(false)
        heroPassed.current = false
        upwardTravel.current = 0
        lastY.current = currentY
        return
      }

      if (!heroPassed.current) {
        setVisible(true)
        heroPassed.current = true
        lastY.current = currentY
        return
      }

      if (currentY < 72) {
        setVisible(true)
        upwardTravel.current = 0
      } else if (difference > 2) {
        setVisible(false)
        upwardTravel.current = 0
      } else if (difference < -2) {
        upwardTravel.current += Math.abs(difference)
        if (upwardTravel.current >= 12) {
          setVisible(true)
        }
      }

      lastY.current = currentY
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [pathname])

  return (
    <motion.a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Blabber All Day on WhatsApp"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      initial={false}
      animate={visible ? { y: 0, opacity: 1 } : { y: 112, opacity: 0 }}
      transition={
        reducedMotion
          ? { duration: 0 }
          : { type: 'spring', stiffness: 240, damping: 27 }
      }
      className={`fixed bottom-5 right-5 z-[60] grid size-14 place-items-center rounded-full border border-[#f1d9e8] bg-[#aa769a] text-white shadow-[0_14px_34px_rgba(43,32,41,.3)] transition-colors hover:bg-[#8d5c7d] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#aa769a] sm:bottom-7 sm:right-7 ${visible ? '' : 'pointer-events-none'}`}
    >
      <WhatsAppIcon size={27} />
    </motion.a>
  )
}
