const emojiFor = (category) => {
  if (/dessert/i.test(category)) return '🍰'
  if (/pizza/i.test(category)) return '🍕'
  if (/bao|dimsum|sushi/i.test(category)) return '🥟'
  if (/drink|coffee/i.test(category)) return '🥤'
  if (/pasta|risotto/i.test(category)) return '🍝'
  if (/salad/i.test(category)) return '🥗'
  return category === 'All' ? null : '🍽️'
}

export default function CategorySection({ categories, category, setCategory }) {
  return (
    <section className="mx-auto max-w-7xl px-5 pb-7 pt-2 sm:px-8 lg:px-12">
      <h2 className="mb-5 text-lg font-bold tracking-tight text-[#f5ede3] sm:text-xl">
        Categories
      </h2>
      <div
        className="flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-3"
        role="group"
        aria-label="Menu categories"
      >
        {categories.map((name) => (
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
            {emojiFor(name) && (
              <span
                aria-hidden="true"
                className="text-lg leading-none"
              >
                {emojiFor(name)}
              </span>
            )}
            {name}
          </button>
        ))}
      </div>
    </section>
  )
}
