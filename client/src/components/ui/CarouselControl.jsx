import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function CarouselControl({ direction, onClick }) {
  const previous = direction === 'previous'

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={previous ? 'Previous story' : 'Next story'}
      className="grid size-11 place-items-center rounded-full border border-[#bca9b3] bg-[#fffaf5] text-[#553947] transition hover:border-[#875574] hover:bg-[#eee2e9]"
    >
      {previous ? <ChevronLeft size={19} /> : <ChevronRight size={19} />}
    </button>
  )
}
