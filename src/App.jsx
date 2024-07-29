import './App.css'
import { Route, Routes } from 'react-router-dom'
import LoginSignUp from './pages/login'
import Journal from './pages/journal'
import ProtectedRoutes from './components/ProtectedRoutes/routesAuth'
import Insigths from './pages/insigths'



function App() {

  return (
    <>
      <Routes>
        <Route path='login' element={<LoginSignUp />} />
        <Route element={<ProtectedRoutes />}>
          {/* Wrap protected content on the protected route */}
          <Route path='journal' element={<Journal />} />
          <Route path='insigths' element={<Insigths/>} />

        </Route>
      </Routes>
    </>
  )
}

export default App
