import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { ArrowUpRight, Check, Copy, X } from 'lucide-react'

export default function OrderDialog({ item, onClose }) {
  const [copied, setCopied] = useState(false)

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
      .then(() => setCopied(true))
      .catch(() => setCopied(false))
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
        className="w-full max-w-md rounded-[28px] border border-[#72566a] bg-[#282126] p-6 text-[#f5ede3] shadow-2xl sm:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#d2a6c2]">
              {item.outlet || 'Juhu'} menu
            </p>
            <h2
              id={`order-${item.id || item.name}`}
              className="mt-2 font-['Cormorant_Garamond'] text-3xl leading-tight"
            >
              {item.name}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close ordering options"
            className="rounded-full p-2 hover:bg-[#44323f]"
          >
            <X size={19} />
          </button>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-[#c9bcc3]">
          Choose an app, then search its outlet menu for this dish. Availability
          may differ between apps.
        </p>
        <button
          type="button"
          onClick={copyName}
          className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#85677a] px-4 py-2 text-xs font-semibold text-[#e2bed4] hover:bg-[#3d3039]"
        >
          {copied ? <Check size={15} /> : <Copy size={15} />}
          {copied ? 'Dish name copied' : 'Copy dish name'}
        </button>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {[
            ['Zomato', item.zomatoLink],
            ['Swiggy', item.swiggyLink],
          ].map(([provider, link]) => (
            <a
              key={provider}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={copyName}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#cba0bd] px-5 py-3 text-sm font-bold text-[#241d20] transition hover:bg-[#e0b9d2]"
            >
              Open {provider}
              <ArrowUpRight size={17} />
            </a>
          ))}
        </div>
      </div>
    </div>,
    document.body,
  )
}
