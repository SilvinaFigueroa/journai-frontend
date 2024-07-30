import './App.css'
import { Route, Routes } from 'react-router-dom'
import ProtectedRoutes from './components/ProtectedRoutes/routesAuth'

import LoginSignUp from './pages/login'
import Journal from './pages/journal'
import Insigths from './pages/insigths'
import Home from './pages/home'



function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>} />
        {/* Including one route for login and another for SignUp to redirect navBar buttons */}
        <Route path='/login' element={<LoginSignUp />} />
        <Route path='/signup' element={<LoginSignUp />} />
        <Route element={<ProtectedRoutes />}>
          {/* Wrap protected content on the protected route */}
          <Route path='/journal' element={<Journal />} />
          <Route path='/insigths' element={<Insigths />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
