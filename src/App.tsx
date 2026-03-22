
import { Routes, Route } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import FilmDetailPage from './pages/FilmDetailPage'
import FavoritesPage from './pages/FavoritesPage'
import HomePage from './pages/HomePage'
import Header from './components/Header'
import { AppRoot, ColorSchemeProvider } from '@vkontakte/vkui'
import { useColorSchemeSwitcher } from './components/ColorSchemeSwitcher'
import FooterWithLayout from './components/Footer'
import { ComparePage } from './pages/ComparePage'
import { useEffect } from 'react'
import { fetchGenresFx } from './common/model/genresStore'

export const MainLayout = () => {

  return (
    <>
      <Header />
      <Outlet />
      <FooterWithLayout />
    </>
  )
}


export default function App() {

  const [colorScheme] = useColorSchemeSwitcher()

  useEffect(() => {
    fetchGenresFx()
    return
  }, [])

  return (
    <ColorSchemeProvider value={colorScheme}>
      <AppRoot disableSettingVKUIClassesInRuntime>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/film/:id" element={<FilmDetailPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/compare" element={<ComparePage />} />
          </Route>
        </Routes>
      </AppRoot>
    </ColorSchemeProvider >
  )
}
