import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import menuItems from '../../data/menuCatalog.json'
import MenuCard from '../ui/MenuCard'
import BrandLogo from '../ui/BrandLogo'

export default function FeaturedMenuSection() {
  const featured = [
    'Blabber Fried Chicken Bao',
    'Fettuccine Al Pesto',
    'Rose Cheese Cake',
  ]
    .map((name) =>
      menuItems.find((item) => item.outlet === 'Juhu' && item.name === name),
    )
    .filter(Boolean)

  return (
    <section className="bg-[#f8f4ef] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[.22em] text-[#916282]">
              From the kitchen
            </p>
            <h2 className="mt-3 font-['Cormorant_Garamond'] text-5xl leading-none tracking-[-.04em] sm:text-7xl">
              A taste of <em className="text-[#a57898]">Blabber.</em>
            </h2>
          </div>
          <Link
            to="/menu"
            className="inline-flex items-center gap-3 self-start rounded-full border border-[#bca9b3] px-5 py-3 text-xs font-bold uppercase tracking-[.1em] hover:bg-[#ede3e8] sm:self-auto"
          >
            View full menu <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
          {featured.map((item, index) => (
            <MenuCard
              key={item.id}
              item={item}
              variant={index % 2 === 0 ? 'light' : 'dark'}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export function VisitSection() {
  return (
    <section className="relative overflow-hidden bg-[#251e23] px-5 py-20 text-[#f8f2ec] sm:px-8 lg:px-12 lg:py-28">
      <div
        className="absolute -right-24 -top-24 h-80 w-80 rounded-full border border-[#a57898]/30"
        aria-hidden="true"
      />
      <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[.23em] text-[#d5a8c3]">
            Come on in
          </p>
          <h2 className="mt-4 max-w-lg font-['Cormorant_Garamond'] text-5xl leading-[.95] tracking-[-.04em] sm:text-7xl">
            There’s always room{' '}
            <em className="text-[#d5a8c3]">at our table.</em>
          </h2>
          <p className="mt-6 max-w-md text-sm leading-7 text-[#d2c3c9]">
            Find us in Juhu, Borivali and Thane for a meal that turns into your
            favourite part of the day.
          </p>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Blabber+All+Day+Mumbai"
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#ae7e9f] px-6 py-3 text-xs font-bold uppercase tracking-[.12em] text-[#211b20]"
          >
            Find us <ArrowRight size={16} />
          </a>
        </div>
        <div className="relative overflow-hidden rounded-[28px]">
          <img
            src="/images/interior.webp"
            alt="Inside Blabber All Day"
            loading="lazy"
            className="h-[340px] w-full object-cover sm:h-[450px]"
          />
          <div className="absolute bottom-5 right-5 rounded-2xl bg-[#f8f4ef] px-5 py-3">
            <BrandLogo
              variant="dark"
              className="w-28"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
