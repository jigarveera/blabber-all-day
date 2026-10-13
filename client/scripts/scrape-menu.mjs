import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const outlets = [
  {
    id: 'juhu',
    name: 'Juhu',
    zomatoLink: 'https://www.zomato.com/mumbai/blabber-all-day-juhu/order',
    swiggyLink:
      'https://www.swiggy.com/city/mumbai/blabber-all-day-gulmohar-road-juhu-rest1092935',
  },
  {
    id: 'borivali',
    name: 'Borivali',
    zomatoLink:
      'https://www.zomato.com/mumbai/blabber-all-day-borivali-east/order',
    swiggyLink:
      'https://www.swiggy.com/city/mumbai/blabber-all-day-malad-kan-east-rest894021',
  },
  {
    id: 'thane',
    name: 'Thane',
    zomatoLink:
      'https://www.zomato.com/mumbai/blabber-all-day-hiranandani-estate-thane-west-thane/order',
    swiggyLink:
      'https://www.swiggy.com/city/mumbai/blabber-all-day-hiranandani-estate-thane-hiranandani-estate-rest1110766',
  },
]

const sourceDirectory = process.argv[2]
const catalog = []

for (const outlet of outlets) {
  const html = sourceDirectory
    ? await readFile(resolve(sourceDirectory, `${outlet.id}.html`), 'utf8')
    : await fetch(outlet.zomatoLink, {
        headers: { 'User-Agent': 'Mozilla/5.0' },
      }).then((response) => {
        if (!response.ok)
          throw new Error(`${outlet.name}: HTTP ${response.status}`)
        return response.text()
      })

  const match = html.match(
    /window\.__PRELOADED_STATE__\s*=\s*JSON\.parse\(("(?:\\.|[^"\\])*")\)/s,
  )
  if (!match) throw new Error(`${outlet.name}: menu data was not found`)

  const state = JSON.parse(JSON.parse(match[1]))
  const restaurant = Object.values(state.pages.restaurant)[0]
  const menus = restaurant?.order?.menuList?.menus
  if (!Array.isArray(menus) || !menus.length) {
    throw new Error(`${outlet.name}: menu is empty`)
  }

  const seen = new Set()
  for (const entry of menus) {
    for (const group of entry.menu.categories) {
      for (const { item } of group.category.items) {
        if (seen.has(item.id)) continue
        seen.add(item.id)

        catalog.push({
          id: item.id,
          name: item.name,
          outlet: outlet.name,
          category: entry.menu.name,
          diet: item.dietary_slugs?.includes('non-veg')
            ? 'Non-veg'
            : item.dietary_slugs?.includes('egg')
              ? 'Egg'
              : 'Veg',
          description: item.desc || '',
          image: item.item_image_url || null,
          zomatoLink: outlet.zomatoLink,
          swiggyLink: outlet.swiggyLink,
          linkScope: 'outlet-menu',
        })
      }
    }
  }
  console.log(`${outlet.name}: ${seen.size} dishes`)
}

await mkdir(resolve('src/data'), { recursive: true })
await writeFile(
  resolve('src/data/menuCatalog.json'),
  `${JSON.stringify(catalog, null, 2)}\n`,
)
console.log(`Saved ${catalog.length} dishes to src/data/menuCatalog.json`)
