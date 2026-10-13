import { Link } from 'react-router-dom'
import BrandLogo from '../ui/BrandLogo'

export default function Footer() {
  return (
    <footer className="bg-[#201a1e] px-5 py-12 text-[#f8f2ec] sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 border-b border-white/15 pb-9 sm:flex-row sm:items-end">
        <div>
          <BrandLogo
            variant="light"
            className="w-36"
          />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#d2c3c9]">
            Good food, great company, and stories that last all day.
          </p>
        </div>
        <nav
          className="flex gap-7 text-sm"
          aria-label="Footer navigation"
        >
          <Link to="/">Home</Link>
          <Link to="/menu">Menu</Link>
          <a
            href="https://www.instagram.com/blabberallday/"
            target="_blank"
            rel="noreferrer"
          >
            Instagram
          </a>
        </nav>
      </div>
      <p className="mx-auto max-w-7xl pt-6 text-xs text-[#b4a5ad]">
        © {new Date().getFullYear()} Blabber All Day · Mumbai
      </p>
    </footer>
  )
}
