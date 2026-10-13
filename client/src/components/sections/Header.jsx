import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu as MenuIcon, X } from 'lucide-react'
import BrandLogo from '../ui/BrandLogo'
import Button from '../ui/Button'

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [overFooter, setOverFooter] = useState(false)
  const { pathname } = useLocation()
  const onOutletDetail = pathname.startsWith('/outlet/')
  const lightSurface =
    !overFooter &&
    (pathname === '/outlet' ||
      pathname === '/reservation' ||
      ((pathname === '/' || onOutletDetail) && scrolled))

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
      className={`pointer-events-none fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${lightSurface ? 'text-[#2b2029]' : 'text-[#f8f2ec]'}`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-8 px-5 sm:px-8 lg:px-12">
        <BrandLogo
          variant={lightSurface ? 'dark' : 'light'}
          className="pointer-events-auto w-28 sm:w-36"
        />
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
          className={`pointer-events-auto rounded-full border p-2.5 backdrop-blur-md md:hidden ${lightSurface ? 'border-[#b999ae] bg-[#f8f4ef]/90' : 'border-white/25 bg-[#171417]/85'}`}
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={20} /> : <MenuIcon size={20} />}
        </button>
      </div>
      {open && (
        <nav
          className="pointer-events-auto flex flex-col gap-2 border-t border-white/10 bg-[#211b20] px-5 py-4 text-[#f8f2ec] md:hidden"
          aria-label="Mobile navigation"
        >
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="rounded-xl px-3 py-3 text-sm"
          >
            Home
          </Link>
          <Link
            to="/menu"
            onClick={() => setOpen(false)}
            className="rounded-xl px-3 py-3 text-sm"
          >
            Menu
          </Link>
          <Link
            to="/outlet"
            onClick={() => setOpen(false)}
            className="rounded-xl px-3 py-3 text-sm"
          >
            Outlets
          </Link>
          <Link
            to="/reservation"
            onClick={() => setOpen(false)}
            className="rounded-xl px-3 py-3 text-sm"
          >
            Reservations
          </Link>
        </nav>
      )}
    </header>
  )
}
