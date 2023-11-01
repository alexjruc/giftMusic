import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Register from './pages/Register'
import PlaylistPublic from './pages/PlaylistPublic'
import Home from './pages/Home'
import Playlists from './pages/Playlists'
import PlaylistDetail from './pages/PlaylistDetail'
import TrackDetail from './pages/TrackDetail'
import ArtistDetail from './pages/ArtistDetail'
import Page404 from './pages/Page404'
import PrivateRoutes from './components/auth/PrivateRoutes'

function App() {

  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/playlists/public/:id' element={<PlaylistPublic/>} />
        
        <Route element={<PrivateRoutes/>}>
          <Route path='/' element={<Home/>} />
          <Route path='/playlists' element={<Playlists />} />
          <Route path='/playlists/:id' element={<PlaylistDetail />} />
          <Route path='/tracks/:id' element={<TrackDetail />} />
          <Route path='/artists/:id' element={<ArtistDetail />} />
        </Route>

        <Route path='*' element={<Page404 />} />

      </Routes>
    </>
  )
}

export default App
