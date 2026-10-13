import { Link } from 'react-router-dom'

export default function BrandLogo({ variant = 'light', className = '' }) {
  return (
    <Link
      to="/"
      aria-label="Blabber All Day home"
      className={'inline-block shrink-0 ' + className}
    >
      <img
        src="/images/blabber-logo-dark.png"
        alt="Blabber all day"
        className={
          'block h-auto w-full object-contain ' +
          (variant === 'light' ? 'brightness-0 invert' : '')
        }
      />
    </Link>
  )
}
