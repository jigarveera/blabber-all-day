import { lazy, Suspense, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Header from './components/sections/Header'
import Footer from './components/sections/Footer'
import Loader from './components/ui/Loader'

const HomePage = lazy(() => import('./components/pages/HomePage'))
const MenuPage = lazy(() => import('./components/pages/MenuPage'))

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
              path="*"
              element={<HomePage />}
            />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
