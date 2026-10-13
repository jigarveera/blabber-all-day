import {
  CakeSlice,
  ChefHat,
  CookingPot,
  CupSoda,
  Fish,
  Flame,
  LayoutGrid,
  Martini,
  Pizza,
  Salad,
  Sandwich,
  Soup,
  UtensilsCrossed,
  Wheat,
} from 'lucide-react'

const iconFor = (category) => {
  if (category === 'All') return LayoutGrid
  if (/dessert/i.test(category)) return CakeSlice
  if (/pizza/i.test(category)) return Pizza
  if (/sushi/i.test(category)) return Fish
  if (/bao|dimsum|sandwich/i.test(category)) return Sandwich
  if (/drink|beverage/i.test(category)) return CupSoda
  if (/cocktail/i.test(category)) return Martini
  if (/pasta|risotto/i.test(category)) return UtensilsCrossed
  if (/salad/i.test(category)) return Salad
  if (/soup|ramen/i.test(category)) return Soup
  if (/bread/i.test(category)) return Wheat
  if (/rice|biryani/i.test(category)) return CookingPot
  if (/tandoori/i.test(category)) return Flame
  if (/chef/i.test(category)) return ChefHat
  return UtensilsCrossed
}

export default function CategorySection({
  categories,
  category,
  setCategory,
  compact,
}) {
  return (
    <section className="sticky top-[148px] z-30 mx-auto max-w-7xl bg-[#191518] px-5 pb-4 pt-4 sm:top-[246px] sm:px-8 lg:px-12">
      <h2
        className={
          'overflow-hidden text-lg font-bold tracking-tight text-[#f5ede3] transition-[max-height,margin,opacity] duration-300 sm:text-xl ' +
          (compact ? 'mb-0 max-h-0 opacity-0' : 'mb-4 max-h-10 opacity-100')
        }
      >
        Categories
      </h2>
      <div
        className="flex gap-4 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        role="group"
        aria-label="Menu categories"
      >
        {categories.map((name) => {
          const Icon = iconFor(name)

          return (
            <button
              key={name}
              type="button"
              onClick={() => setCategory(name)}
              aria-pressed={category === name}
              className={
                'inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition hover:-translate-y-0.5 ' +
                (category === name
                  ? 'border-[#aa769a] bg-[#aa769a] text-[#191518]'
                  : 'border-[#705466] bg-[#2b2429] text-[#f5ede3] hover:border-[#cba0bd] hover:bg-[#3b2d37]')
              }
            >
              <Icon
                size={17}
                strokeWidth={1.8}
                aria-hidden="true"
                className="shrink-0"
              />
              {name}
            </button>
          )
        })}
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-full h-[5vh] bg-[linear-gradient(to_bottom,rgba(25,21,24,1)_0%,rgba(25,21,24,.8)_20%,rgba(25,21,24,.6)_40%,rgba(25,21,24,.4)_60%,rgba(25,21,24,.2)_80%,rgba(25,21,24,0)_100%)]"
      />
    </section>
  )
}
