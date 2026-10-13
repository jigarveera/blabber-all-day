import GalleryTile from '../ui/GalleryTile'

const gallery = [
  {
    label: 'Food gallery',
    interval: 5200,
    className:
      'col-span-2 h-[390px] sm:h-[470px] md:col-span-7 md:row-span-2 md:h-full',
    slides: [
      {
        src: '/images/hero-restaurant-2.webp',
        alt: 'A table filled with Blabber All Day plates and drinks',
      },
      {
        src: '/images/bao.jpg',
        alt: 'Blabber All Day bao buns served with dipping sauce',
      },
      {
        src: '/images/malay-curry.jpg',
        alt: 'Malay curry and rice at Blabber All Day',
      },
      {
        src: '/images/pesto.jpg',
        alt: 'Pesto pasta with cherry tomatoes',
      },
      {
        src: '/images/food-1.webp',
        alt: 'A close-up of a Blabber All Day pizza',
      },
    ],
  },
  {
    label: 'Spaces gallery',
    interval: 6200,
    className: 'h-[230px] md:col-span-5 md:h-full',
    slides: [
      {
        src: '/images/hero-restaurant-3.webp',
        alt: 'The dining room at Blabber All Day',
      },
      {
        src: '/images/hero-restaurant-4.webp',
        alt: 'A sunlit seating area at Blabber All Day',
      },
      {
        src: '/images/hero-restaurant.webp',
        alt: 'An inviting table beneath a chandelier',
      },
    ],
  },
  {
    label: 'Food and moments gallery',
    interval: 6900,
    className: 'h-[230px] md:col-span-5 md:h-full',
    slides: [
      {
        src: '/images/food-2.webp',
        alt: 'The bar at Blabber All Day',
      },
      {
        src: '/images/bao.jpg',
        alt: 'Blabber All Day bao buns served with dipping sauce',
      },
      {
        src: '/images/food-1.webp',
        alt: 'A close-up of a Blabber All Day pizza',
      },
    ],
  },
]

export default function GallerySection() {
  return (
    <section
      data-header-theme="light"
      aria-labelledby="gallery-heading"
      className="bg-[#f8f4ef] px-5 py-24 text-[#2b2029] sm:px-8 sm:py-32 lg:px-12"
    >
      <div className="mx-auto max-w-7xl">
        <h2
          id="gallery-heading"
          className="mb-5 font-['Cormorant_Garamond'] text-[clamp(3.7rem,8vw,7.5rem)] font-semibold leading-[.83] tracking-[-.05em] sm:mb-7"
        >
          All the good <span className="italic text-[#a77497]">bites.</span>
        </h2>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-12 md:grid-rows-[260px_260px] md:gap-4 lg:grid-rows-[290px_290px]">
          {gallery.map((item, index) => (
            <GalleryTile
              key={item.label}
              slides={item.slides}
              label={item.label}
              interval={item.interval}
              index={index}
              className={item.className}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
