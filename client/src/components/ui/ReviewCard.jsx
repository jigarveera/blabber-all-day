import { ArrowUpRight } from 'lucide-react'

export default function ReviewCard({ review }) {
  return (
    <article className="flex h-full flex-col rounded-[26px] bg-[#eee8e8] p-6 text-[#241d20] shadow-[0_18px_45px_rgba(49,34,44,.08)] sm:p-8">
      <div className="flex items-center justify-between gap-3">
        <div className="grid size-11 place-items-center rounded-full bg-[#aa769a] font-['Cormorant_Garamond'] text-2xl font-bold text-white">
          {review.author.charAt(0)}
        </div>
        <span className="text-[10px] font-bold uppercase tracking-[.14em] text-[#875574]">
          Google review
        </span>
      </div>
      <blockquote className="mt-12 font-['Cormorant_Garamond'] text-[clamp(1.45rem,2.2vw,2rem)] leading-[1.1] tracking-[-.025em]">
        “{review.quote}”
      </blockquote>
      <div className="mt-auto pt-8">
        <p className="font-['Cormorant_Garamond'] text-3xl italic leading-none text-[#80516f]">
          {review.author}
        </p>
        <a
          href={review.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[.12em] text-[#71646b] hover:text-[#875574]"
          onClick={(event) => event.stopPropagation()}
        >
          {review.outlet} · View source
          <ArrowUpRight size={13} />
        </a>
      </div>
    </article>
  )
}
