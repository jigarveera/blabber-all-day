import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import OrderDialog from './OrderDialog'

export default function MenuCard({
  item,
  variant = 'light',
  mobileVariant,
  showOutlet = false,
}) {
  const [orderOpen, setOrderOpen] = useState(false)
  const dark = variant === 'dark'
  const mobileDark = (mobileVariant ?? variant) === 'dark'

  return (
    <>
      <article
        className={
          'group flex min-w-0 flex-col self-start overflow-hidden rounded-[22px] border p-2 transition duration-300 hover:-translate-y-1 sm:rounded-[25px] sm:p-2.5 ' +
          (mobileDark
            ? 'border-[#604655] bg-[#282126] text-[#f5ede3] shadow-[0_18px_40px_rgba(0,0,0,.2)] hover:border-[#a77898]'
            : 'border-[#e3d9d2] bg-[#fffaf5] text-[#241d20] shadow-[0_12px_36px_rgba(49,34,44,.07)] hover:shadow-[0_20px_45px_rgba(49,34,44,.13)]') +
          ' ' +
          (dark
            ? 'sm:border-[#604655] sm:bg-[#282126] sm:text-[#f5ede3] sm:shadow-[0_18px_40px_rgba(0,0,0,.2)] sm:hover:border-[#a77898] sm:hover:shadow-[0_18px_40px_rgba(0,0,0,.2)]'
            : 'sm:border-[#e3d9d2] sm:bg-[#fffaf5] sm:text-[#241d20] sm:shadow-[0_12px_36px_rgba(49,34,44,.07)] sm:hover:border-[#e3d9d2] sm:hover:shadow-[0_20px_45px_rgba(49,34,44,.13)]')
        }
      >
        <div className="relative aspect-[1.12] overflow-hidden rounded-[17px] bg-[#523b4c] sm:rounded-[19px]">
          {item.image ? (
            <img
              src={item.image}
              alt={item.name}
              loading="lazy"
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_25%_20%,#aa769a,#392638)]">
              <img
                src="/images/blabber-logo-dark.png"
                alt=""
                className="w-2/3 brightness-0 invert"
              />
            </div>
          )}
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#191518]/85 to-transparent" />
          <span className="absolute bottom-3 left-3 right-3 text-[10px] font-semibold uppercase tracking-[.13em] text-white sm:left-4 sm:text-xs">
            {item.category}
            {showOutlet ? ` · ${item.outlet}` : ''}
          </span>
        </div>
        <div className="flex flex-col gap-3 px-1 pb-1 pt-3 sm:gap-4 sm:px-2 sm:pb-2 sm:pt-4">
          <h3 className="font-['Cormorant_Garamond'] text-xl leading-tight sm:text-2xl">
            {item.name}
          </h3>
          <button
            type="button"
            onClick={() => setOrderOpen(true)}
            aria-label={`Order ${item.name} from ${item.outlet || 'Juhu'}`}
            className={
              'inline-flex w-full items-center justify-center gap-2 rounded-full px-3 py-2.5 text-[10px] font-bold uppercase tracking-[.1em] transition sm:py-3 sm:text-xs ' +
              (mobileDark
                ? 'bg-[#cba0bd] text-[#241d20] hover:bg-[#e0b9d2]'
                : 'bg-[#875574] text-white hover:bg-[#6f4560]') +
              ' ' +
              (dark
                ? 'sm:bg-[#cba0bd] sm:text-[#241d20] sm:hover:bg-[#e0b9d2]'
                : 'sm:bg-[#875574] sm:text-white sm:hover:bg-[#6f4560]')
            }
          >
            Order now
            <ArrowUpRight size={15} />
          </button>
        </div>
      </article>
      {orderOpen && (
        <OrderDialog
          item={item}
          onClose={() => setOrderOpen(false)}
        />
      )}
    </>
  )
}
