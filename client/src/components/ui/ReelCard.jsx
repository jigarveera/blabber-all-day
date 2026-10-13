import { useEffect, useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'

export default function ReelCard({
  reel,
  active,
  manual,
  playbackToken,
  onEnded,
}) {
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (active) {
      video.currentTime = 0
      video.play().catch(() => {})
    } else {
      video.pause()
      video.currentTime = 0
    }
  }, [active, manual, playbackToken])

  return (
    <article className="relative h-full overflow-hidden rounded-[26px] bg-[#241d20] text-white shadow-[0_18px_45px_rgba(49,34,44,.18)]">
      <video
        ref={videoRef}
        src={reel.videoSrc}
        poster={reel.poster}
        preload={active ? 'auto' : 'metadata'}
        playsInline
        muted
        loop={!manual}
        onEnded={onEnded}
        onError={onEnded}
        className="h-full w-full object-cover"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/35" />
      <div className="pointer-events-none absolute left-5 top-5 flex items-center gap-2">
        <span className="grid size-9 place-items-center rounded-full border border-white/50 bg-[#aa769a] font-['Cormorant_Garamond'] text-xl italic">
          B
        </span>
        <span className="text-[10px] font-bold uppercase tracking-[.14em]">
          Blabber reel {reel.number}
        </span>
      </div>
      <a
        href={reel.instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open Blabber reel ${reel.number} on Instagram`}
        onClick={(event) => event.stopPropagation()}
        className="absolute right-4 top-4 z-10 grid size-10 place-items-center rounded-full border border-white/65 bg-[#241d20]/70 text-white backdrop-blur-sm transition hover:bg-[#aa769a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        <ArrowUpRight size={21} />
      </a>
    </article>
  )
}
