import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'

export default function OrderDialog({ item, onClose }) {
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  const copyName = () => {
    navigator.clipboard
      ?.writeText(item.name)
      .catch(() => {})
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#130e12]/80 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={`order-${item.id || item.name}`}
        className="relative w-full max-w-md"
      >
        <div className="relative mb-4 flex min-h-10 items-center justify-center px-6">
          <p className="text-center text-[10px] font-bold uppercase tracking-[.2em] text-[#e9c4db]">
            {item.outlet || 'Juhu'} menu
          </p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close ordering options"
            className="absolute right-0 grid size-10 place-items-center rounded-full border border-white/35 bg-[#282126] text-white transition hover:bg-[#44323f]"
          >
            <X size={19} />
          </button>
        </div>
        <div
          className="relative isolate flex flex-col gap-4 overflow-hidden rounded-[28px] border border-[#72566a] bg-[#282126] p-6 text-center text-[#f5ede3] shadow-2xl"
        >
          {item.image && (
            <img
              src={item.image}
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-20 h-full w-full scale-110 object-cover blur-xl"
            />
          )}
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[#191518]/80" />
          <h2
            id={`order-${item.id || item.name}`}
            className="font-['Cormorant_Garamond'] text-3xl leading-tight"
          >
            {item.name}
          </h2>
          <p className="text-sm leading-relaxed text-[#f0e5eb]">
            Choose an app, then search its outlet menu for this dish. Availability
            may differ between apps.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              [
                'Zomato',
                'Open',
                item.zomatoLink,
                '/icons/zomato.svg',
                'bg-[#E23744] hover:bg-[#c82e3b]',
              ],
              [
                'Swiggy',
                'Open Swiggy',
                item.swiggyLink,
                '/icons/swiggy.svg',
                'bg-[#FF5200] hover:bg-[#df4800]',
              ],
            ].map(([provider, label, link, icon, color]) => (
              <a
                key={provider}
                href={link}
                aria-label={`Open ${provider}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={copyName}
                className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold text-white shadow-lg transition ${color}`}
              >
                {label}
                <img
                  src={icon}
                  alt=""
                  aria-hidden="true"
                  className={provider === 'Zomato' ? 'h-5 w-12' : 'size-5'}
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}
