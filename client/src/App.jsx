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
const LegalPage = lazy(() => import('./components/pages/LegalPage'))
const FaqPage = lazy(() => import('./components/pages/FaqPage'))

function PageReady({ children }) {
  const { pathname } = useLocation()

  useEffect(() => {
    let secondFrame
    const firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(() => {
        window.dispatchEvent(
          new CustomEvent('blabber:page-ready', { detail: { pathname } }),
        )
      })
    })

    return () => {
      window.cancelAnimationFrame(firstFrame)
      window.cancelAnimationFrame(secondFrame)
    }
  }, [pathname])

  return children
}

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
              element={
                <PageReady>
                  <HomePage />
                </PageReady>
              }
            />
            <Route
              path="/menu"
              element={
                <PageReady>
                  <MenuPage />
                </PageReady>
              }
            />
            <Route
              path="/outlet"
              element={
                <PageReady>
                  <OutletsPage />
                </PageReady>
              }
            />
            <Route
              path="/outlet/:slug"
              element={
                <PageReady>
                  <OutletPage />
                </PageReady>
              }
            />
            <Route
              path="/reservation"
              element={
                <PageReady>
                  <ReservationPage />
                </PageReady>
              }
            />
            <Route
              path="/faq"
              element={
                <PageReady>
                  <FaqPage />
                </PageReady>
              }
            />
            <Route
              path="/privacy-policy"
              element={
                <PageReady>
                  <LegalPage type="privacy" />
                </PageReady>
              }
            />
            <Route
              path="/cookie-policy"
              element={
                <PageReady>
                  <LegalPage type="cookies" />
                </PageReady>
              }
            />
            <Route
              path="/terms-of-use"
              element={
                <PageReady>
                  <LegalPage type="terms" />
                </PageReady>
              }
            />
            <Route
              path="/reservations-and-orders"
              element={
                <PageReady>
                  <LegalPage type="reservations" />
                </PageReady>
              }
            />
            <Route
              path="*"
              element={
                <PageReady>
                  <HomePage />
                </PageReady>
              }
            />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  )
}
