import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, LayoutGroup } from 'framer-motion'
import menuItems from '../../data/menuCatalog.json'
import outlets from '../../data/outlets'
import MenuHeroSection from '../sections/MenuHeroSection'
import CategorySection from '../sections/CategorySection'
import MenuGridSection from '../sections/MenuGridSection'
import OutletSection from '../sections/OutletSection'

const STORAGE_KEY = 'blabber-menu-preferences-v1'
const defaultPreferences = {
  query: '',
  category: 'All',
  outlet: null,
  diet: 'All',
  sort: 'featured',
}

const readSavedPreferences = () => {
  try {
    const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY))
    return {
      query: typeof saved?.query === 'string' ? saved.query : '',
      category: typeof saved?.category === 'string' ? saved.category : 'All',
      outlet: outlets.some((item) => item.name === saved?.outlet)
        ? saved.outlet
        : null,
      diet: ['All', 'Veg', 'Non-veg', 'Egg'].includes(saved?.diet)
        ? saved.diet
        : 'All',
      sort: ['featured', 'az', 'za'].includes(saved?.sort)
        ? saved.sort
        : 'featured',
    }
  } catch {
    return defaultPreferences
  }
}

export default function MenuPage() {
  const [savedPreferences] = useState(readSavedPreferences)
  const [query, setQuery] = useState(savedPreferences.query)
  const [category, setCategory] = useState(savedPreferences.category)
  const [outlet, setOutlet] = useState(savedPreferences.outlet)
  const [diet, setDiet] = useState(savedPreferences.diet)
  const [sort, setSort] = useState(savedPreferences.sort)
  const [compact, setCompact] = useState(false)

  useEffect(() => {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ query, category, outlet, diet, sort }),
      )
    } catch {
      // The menu remains usable if browser storage is unavailable.
    }
  }, [query, category, outlet, diet, sort])

  const outletItems = useMemo(
    () =>
      outlet ? menuItems.filter((item) => item.outlet === outlet) : menuItems,
    [outlet],
  )

  const categories = useMemo(
    () => ['All', ...new Set(outletItems.map((item) => item.category))],
    [outletItems],
  )

  const activeCategory = categories.includes(category) ? category : 'All'
  const searchWords = useMemo(
    () => query.trim().toLowerCase().split(/\s+/).filter(Boolean),
    [query],
  )

  const items = useMemo(
    () =>
      outletItems
        .filter((item) => {
          const searchableText = (item.name + ' ' + item.description).toLowerCase()

          return (
            (activeCategory === 'All' || item.category === activeCategory) &&
            (diet === 'All' || item.diet === diet) &&
            searchWords.every((word) => searchableText.includes(word))
          )
        })
        .sort((a, b) =>
          sort === 'az'
            ? a.name.localeCompare(b.name)
            : sort === 'za'
              ? b.name.localeCompare(a.name)
              : 0,
        ),
    [outletItems, searchWords, activeCategory, diet, sort],
  )

  const selectOutlet = (nextOutlet) => {
    setOutlet(nextOutlet)
    setCategory('All')
  }

  const resetFilters = () => {
    setQuery('')
    setCategory('All')
    setDiet('All')
    setSort('featured')
  }

  return (
    <div className="min-h-screen bg-[#191518] text-[#f5ede3]">
      <LayoutGroup id="menu-outlet-selection">
        <AnimatePresence initial={false}>
          {!outlet && (
            <OutletSection
              key="outlet-selection"
              onSelect={selectOutlet}
            />
          )}
        </AnimatePresence>
        <MenuHeroSection
          query={query}
          setQuery={setQuery}
          diet={diet}
          setDiet={setDiet}
          sort={sort}
          setSort={setSort}
          outlet={outlet}
          onSelectOutlet={selectOutlet}
          compact={compact}
          setCompact={setCompact}
        />
      </LayoutGroup>
      <div className="relative">
        <CategorySection
          categories={categories}
          category={activeCategory}
          setCategory={setCategory}
          compact={compact}
        />
        <MenuGridSection
          key={`${outlet ?? 'all'}|${query}|${activeCategory}|${diet}|${sort}`}
          items={items}
          resetFilters={resetFilters}
          showOutlet={!outlet}
        />
      </div>
    </div>
  )
}
