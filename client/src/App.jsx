import { lazy, Suspense, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Header from './components/sections/Header'
import Footer from './components/sections/Footer'
import Loader from './components/ui/Loader'
import FloatingWhatsApp from './components/ui/FloatingWhatsApp'

const HomePage = lazy(() => import('./components/pages/HomePage'))
const MenuPage = lazy(() => import('./components/pages/MenuPage'))
const OutletsPage = lazy(() => import('./components/pages/OutletsPage'))
const OutletPage = lazy(() => import('./components/pages/OutletPage'))
const ReservationPage = lazy(() => import('./components/pages/ReservationPage'))

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

export default function App() {
  return (
    <div className="font-['DM_Sans']">
      <ScrollToTop />
      <Header />
      <main>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route
              path="/"
              element={<HomePage />}
            />
            <Route
              path="/menu"
              element={<MenuPage />}
            />
            <Route
              path="/outlet"
              element={<OutletsPage />}
            />
            <Route
              path="/outlet/:slug"
              element={<OutletPage />}
            />
            <Route
              path="/reservation"
              element={<ReservationPage />}
            />
            <Route
              path="*"
              element={<HomePage />}
            />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  )
}
