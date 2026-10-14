import { useEffect } from 'react'
import FaqSection from '../sections/FaqSection'
import ReservationSection from '../sections/ReservationSection'

export default function FaqPage() {
  useEffect(() => {
    const previousTitle = document.title
    document.title = 'Borivali FAQs | Blabber All Day'
    return () => {
      document.title = previousTitle
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#f7f1ec] text-[#2b2029]">
      <FaqSection page />
      <ReservationSection />
    </div>
  )
}
