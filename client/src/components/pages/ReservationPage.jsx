import { useSearchParams } from 'react-router-dom'
import ReservationSection from '../sections/ReservationSection'

export default function ReservationPage() {
  const [searchParams] = useSearchParams()

  return (
    <div className="min-h-screen bg-[#f1ebe6] text-[#2b2029]">
      <ReservationSection
        page
        defaultOutlet={searchParams.get('outlet') || ''}
      />
    </div>
  )
}
