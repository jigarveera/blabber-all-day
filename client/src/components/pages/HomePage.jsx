import HeroSection from '../sections/HeroSection'
import HomeOutletsSection from '../sections/HomeOutletsSection'
import GallerySection from '../sections/GallerySection'
import VoicesSection from '../sections/VoicesSection'
import ReservationSection from '../sections/ReservationSection'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#f8f4ef] text-[#251e23]">
      <HeroSection />
      <GallerySection />
      <VoicesSection />
      <HomeOutletsSection />
      <ReservationSection />
    </div>
  )
}
