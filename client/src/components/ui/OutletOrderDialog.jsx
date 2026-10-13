import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'

export default function OutletOrderDialog({ outlet, onClose }) {
  const closeRef = useRef(null)

  useEffect(() => {
    closeRef.current?.focus()

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onClose])

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
        aria-labelledby={`order-outlet-${outlet.slug}`}
        className="relative w-full max-w-md"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close ordering options"
          className="absolute -top-14 right-0 grid size-10 place-items-center rounded-full border border-white/35 bg-[#282126] text-white transition hover:bg-[#44323f]"
        >
          <X size={19} />
        </button>
        <div className="flex flex-col gap-4 rounded-[28px] border border-[#72566a] bg-[#282126] p-6 text-center text-[#f5ede3] shadow-2xl">
          <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#e9c4db]">
            Order from {outlet.name}
          </p>
          <h2
            id={`order-outlet-${outlet.slug}`}
            className="font-['Cormorant_Garamond'] text-4xl leading-none"
          >
            Order your favourites.
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <a
              href={outlet.zomatoLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#E23744] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#c82e3b]"
            >
              Open
              <img
                src="/icons/zomato.svg"
                alt="Zomato"
                className="h-5 w-12"
              />
            </a>
            <a
              href={outlet.swiggyLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#FF5200] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#df4800]"
            >
              Open Swiggy
              <img
                src="/icons/swiggy.svg"
                alt=""
                aria-hidden="true"
                className="size-5"
              />
            </a>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}
