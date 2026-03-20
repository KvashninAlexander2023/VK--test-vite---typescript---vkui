
import { Routes, Route } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import FilmDetailPage from './pages/FilmDetailPage'
import FavoritesPage from './pages/FavoritesPage'
import HomePage from './pages/HomePage'
import Header from './components/Header'
import { AppRoot, ColorSchemeProvider } from '@vkontakte/vkui'
import { useColorSchemeSwitcher } from './ColorSchemeSwitcher'
import Footer from './components/Footer'

export const MainLayout = () => {

 

  return (
    <>
      <Header />
      <Outlet />  
      <Footer />
    </>
  )
}


export default function App() {

   const [colorScheme] = useColorSchemeSwitcher()

  return (
    <ColorSchemeProvider value={colorScheme}>
      <AppRoot disableSettingVKUIClassesInRuntime>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/film/:id" element={<FilmDetailPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
          </Route>
        </Routes>
      </AppRoot>
    </ColorSchemeProvider >
  )
}
