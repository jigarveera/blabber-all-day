import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Menu as MenuIcon, X } from 'lucide-react'
import BrandLogo from '../ui/BrandLogo'
import Button from '../ui/Button'

const menuLinks = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Menu' },
  { to: '/outlet', label: 'Outlets' },
  { to: '/reservation', label: 'Reservations' },
  { to: '/faq', label: 'FAQs' },
]

const legalLinks = [
  { to: '/privacy-policy', label: 'Privacy' },
  { to: '/cookie-policy', label: 'Cookies' },
  { to: '/terms-of-use', label: 'Terms' },
  { to: '/reservations-and-orders', label: 'Reservations & orders' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [closing, setClosing] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [overFooter, setOverFooter] = useState(false)
  const pendingPathRef = useRef(null)
  const reducedMotion = useReducedMotion()
  const { pathname } = useLocation()
  const menuChromeVisible = open || closing
  const onOutletDetail = pathname.startsWith('/outlet/')
  const lightSurface =
    !overFooter &&
    (pathname === '/outlet' ||
      pathname === '/reservation' ||
      pathname === '/faq' ||
      legalLinks.some((link) => link.to === pathname) ||
      ((pathname === '/' || onOutletDetail) && scrolled))

  useEffect(() => {
    const onPageReady = (event) => {
      if (event.detail?.pathname !== pendingPathRef.current) return
      pendingPathRef.current = null
      setClosing(true)
      setOpen(false)
    }

    window.addEventListener('blabber:page-ready', onPageReady)
    return () => window.removeEventListener('blabber:page-ready', onPageReady)
  }, [])

  useEffect(() => {
    if (!menuChromeVisible) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        pendingPathRef.current = null
        setClosing(true)
        setOpen(false)
      }
    }
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [menuChromeVisible])

  const onMenuLinkClick = (event, to) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    if (to === pathname) {
      pendingPathRef.current = null
      setClosing(true)
      setOpen(false)
      return
    }
    pendingPathRef.current = to
  }

  useEffect(() => {
    const onScroll = () => {
      const firstSection = document.querySelector('main section')
      const footer = document.querySelector('footer')
      if (pathname === '/') {
        const activeSection = [
          ...document.querySelectorAll('main section[data-header-theme]'),
        ].find((section) => {
          const bounds = section.getBoundingClientRect()
          return bounds.top <= 80 && bounds.bottom > 80
        })
        setScrolled(activeSection?.dataset.headerTheme === 'light')
      } else {
        setScrolled((firstSection?.getBoundingClientRect().bottom ?? 0) <= 80)
      }
      setOverFooter((footer?.getBoundingClientRect().top ?? Infinity) <= 80)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [pathname])

  return (
    <header
      className={`pointer-events-none fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${menuChromeVisible || !lightSurface ? 'text-[#f8f2ec]' : 'text-[#2b2029]'}`}
    >
      <AnimatePresence onExitComplete={() => setClosing(false)}>
        {open && (
          <motion.div
            id="mobile-navigation"
            initial={reducedMotion ? false : { x: '-100%' }}
            animate={{ x: '0%' }}
            exit={{ x: '-100%' }}
            transition={
              reducedMotion
                ? { duration: 0 }
                : { duration: 0.62, ease: [0.22, 1, 0.36, 1] }
            }
            className="pointer-events-auto fixed inset-0 z-0 overflow-y-auto bg-[#211820]/85 text-[#f8f2ec] backdrop-blur-3xl md:hidden"
          >
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <motion.div
                animate={
                  reducedMotion
                    ? undefined
                    : { x: [0, 80, -15, 0], y: [0, 110, 30, 0], scale: [1, 1.2, 0.9, 1] }
                }
                transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -left-32 top-12 size-[28rem] rounded-full bg-[#aa769a]/55 blur-[90px]"
              />
              <motion.div
                animate={
                  reducedMotion
                    ? undefined
                    : { x: [0, -100, 35, 0], y: [0, -90, 55, 0], scale: [1, 0.85, 1.15, 1] }
                }
                transition={{ duration: 19, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -right-32 bottom-0 size-[30rem] rounded-full bg-[#69465f]/70 blur-[95px]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,.11),transparent_40%,rgba(214,168,197,.08))]" />
            </div>
            <div className="relative flex min-h-[100svh] flex-col px-5 pb-9 pt-28 sm:px-8">
              <div className="rounded-[32px] border border-white/20 bg-white/[.08] px-5 py-6 shadow-[0_24px_80px_rgba(14,8,15,.28)] backdrop-blur-2xl sm:px-8">
                <p className="text-[11px] font-bold uppercase tracking-[.24em] text-[#edcbe0]">
                  Find your way
                </p>
                <nav
                  aria-label="Mobile navigation"
                  className="mt-4 flex flex-col"
                >
                  {menuLinks.map((link, index) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={(event) => onMenuLinkClick(event, link.to)}
                      className="group flex items-center justify-between gap-4 border-b border-white/15 py-2.5 font-['Cormorant_Garamond'] text-[clamp(3.2rem,12vw,5.5rem)] font-semibold leading-none tracking-[-.04em] transition hover:text-[#e8bfd7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white max-[359px]:text-[2.3rem]"
                    >
                      <span className="flex items-start gap-3">
                        <span className="mt-1 font-['DM_Sans'] text-[11px] font-bold tracking-[.16em] text-[#d6a8c5]">
                          0{index + 1}
                        </span>
                        {link.label}
                      </span>
                      <ArrowUpRight
                        size={22}
                        className="shrink-0 text-[#e8bfd7] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                      />
                    </Link>
                  ))}
                </nav>
              </div>
              <nav
                aria-label="Legal information"
                className="mt-auto flex flex-wrap gap-x-5 gap-y-3 pt-8 text-sm text-[#ead5e1]"
              >
                {legalLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={(event) => onMenuLinkClick(event, link.to)}
                    className="underline decoration-[#bd8fac] underline-offset-4 transition hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="relative z-10 mx-auto flex h-20 max-w-7xl items-center justify-between gap-8 px-5 sm:px-8 lg:px-12">
        <div
          className="pointer-events-auto"
          onClickCapture={(event) => {
            if (open) onMenuLinkClick(event, '/')
          }}
        >
          <BrandLogo
            variant={menuChromeVisible || !lightSurface ? 'light' : 'dark'}
            className="w-28 sm:w-36"
          />
        </div>
        <nav
          className="pointer-events-auto hidden items-center gap-7 md:flex"
          aria-label="Main navigation"
        >
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              'text-xs font-semibold uppercase tracking-[.18em] transition hover:text-[#dcb6ce] ' +
              (isActive
                ? lightSurface
                  ? 'text-[#9a6689]'
                  : 'text-[#dcb6ce]'
                : lightSurface
                  ? 'text-[#2b2029]'
                  : 'text-[#f8f2ec]')
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/menu"
            className={({ isActive }) =>
              'text-xs font-semibold uppercase tracking-[.18em] transition hover:text-[#dcb6ce] ' +
              (isActive
                ? lightSurface
                  ? 'text-[#9a6689]'
                  : 'text-[#dcb6ce]'
                : lightSurface
                  ? 'text-[#2b2029]'
                  : 'text-[#f8f2ec]')
            }
          >
            Menu
          </NavLink>
          <NavLink
            to="/outlet"
            className={({ isActive }) =>
              'text-xs font-semibold uppercase tracking-[.18em] transition hover:text-[#dcb6ce] ' +
              (isActive
                ? lightSurface
                  ? 'text-[#9a6689]'
                  : 'text-[#dcb6ce]'
                : lightSurface
                  ? 'text-[#2b2029]'
                  : 'text-[#f8f2ec]')
            }
          >
            Outlets
          </NavLink>
          <NavLink
            to="/reservation"
            className={({ isActive }) =>
              'text-xs font-semibold uppercase tracking-[.18em] transition hover:text-[#dcb6ce] ' +
              (isActive
                ? lightSurface
                  ? 'text-[#9a6689]'
                  : 'text-[#dcb6ce]'
                : lightSurface
                  ? 'text-[#2b2029]'
                  : 'text-[#f8f2ec]')
            }
          >
            Reservations
          </NavLink>
        </nav>
        <div className="pointer-events-auto hidden md:block">
          <Button
            to="/menu"
            size="sm"
          >
            Explore menu
          </Button>
        </div>
        <button
          type="button"
          className={`pointer-events-auto grid size-11 place-items-center rounded-full border backdrop-blur-xl md:hidden ${menuChromeVisible ? 'border-white/40 bg-white/15 text-white' : lightSurface ? 'border-[#b999ae] bg-[#f8f4ef]/90' : 'border-white/25 bg-[#171417]/85'}`}
          aria-label={menuChromeVisible ? 'Close navigation' : 'Open navigation'}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          disabled={closing}
          onClick={() => {
            pendingPathRef.current = null
            if (open) {
              setClosing(true)
              setOpen(false)
            } else {
              setOpen(true)
            }
          }}
        >
          {menuChromeVisible ? <X size={22} /> : <MenuIcon size={20} />}
        </button>
      </div>
    </header>
  )
}
