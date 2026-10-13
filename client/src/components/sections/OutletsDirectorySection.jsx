import outlets from '../../data/outlets'
import OutletLocationCard from '../ui/OutletLocationCard'

export default function OutletsDirectorySection() {
  return (
    <section className="mx-auto max-w-7xl px-5 pb-24 pt-24 sm:px-8 lg:px-12">
      <div className="text-center">
        <h1 className="font-['Cormorant_Garamond'] text-[clamp(3.6rem,8vw,7rem)] font-semibold leading-[.87] tracking-[-.04em] text-[#2b2029]">
          Find us around <span className="italic text-[#a77497]">Mumbai.</span>
        </h1>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {outlets.map((outlet, index) => (
          <OutletLocationCard
            key={outlet.slug}
            outlet={outlet}
            index={index}
          />
        ))}
      </div>
    </section>
  )
}
