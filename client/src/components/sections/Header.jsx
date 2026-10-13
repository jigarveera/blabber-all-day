import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu as MenuIcon, X } from 'lucide-react'
import BrandLogo from '../ui/BrandLogo'
import Button from '../ui/Button'

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 text-[#f8f2ec]">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-8 px-5 sm:px-8 lg:px-12">
        <BrandLogo
          variant="light"
          className="w-28 sm:w-36"
        />
        <nav
          className="hidden items-center gap-9 md:flex"
          aria-label="Main navigation"
        >
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              'text-xs font-semibold uppercase tracking-[.18em] transition hover:text-[#dcb6ce] ' +
              (isActive ? 'text-[#dcb6ce]' : 'text-[#f8f2ec]')
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/menu"
            className={({ isActive }) =>
              'text-xs font-semibold uppercase tracking-[.18em] transition hover:text-[#dcb6ce] ' +
              (isActive ? 'text-[#dcb6ce]' : 'text-[#f8f2ec]')
            }
          >
            Menu
          </NavLink>
        </nav>
        <div className="hidden md:block">
          <Button
            to="/menu"
            size="sm"
          >
            Explore menu
          </Button>
        </div>
        <button
          type="button"
          className="rounded-full border border-white/25 bg-[#171417]/85 p-2.5 backdrop-blur-md md:hidden"
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={20} /> : <MenuIcon size={20} />}
        </button>
      </div>
      {open && (
        <nav
          className="flex flex-col gap-2 border-t border-white/10 bg-[#211b20] px-5 py-4 md:hidden"
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
        </nav>
      )}
    </header>
  )
}
