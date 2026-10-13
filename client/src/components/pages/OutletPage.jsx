import { Navigate, useParams } from 'react-router-dom'
import outlets from '../../data/outlets'
import OutletDetailSection from '../sections/OutletDetailSection'

export default function OutletPage() {
  const { slug } = useParams()
  const outlet = outlets.find((item) => item.slug === slug)

  if (!outlet) {
    return (
      <Navigate
        to="/outlet"
        replace
      />
    )
  }

  return (
    <div className="min-h-screen bg-[#f8f4ef] text-[#2b2029]">
      <OutletDetailSection outlet={outlet} />
    </div>
  )
}
