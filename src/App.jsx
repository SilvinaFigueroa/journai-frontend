import './App.css'
import { Route, Routes, Navigate} from 'react-router-dom'
import ProtectedRoutes from './components/ProtectedRoutes/routesAuth'


import LoginSignUp from './pages/login'
import Journal from './pages/journal'
import Insights from './pages/insights'
import Home from './pages/home'
import Navbar from './components/navbar/Navbar'
import Footer from './components/footer/Footer'



function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        {/* Including one route for login and another for SignUp to redirect navBar buttons */}
        <Route path='/login' element={<LoginSignUp />} />
        <Route path='/signup' element={<LoginSignUp />} />
        <Route element={<ProtectedRoutes />}>
          {/* Wrap protected content on the protected route */}
          <Route path='/journal' element={<Journal />} />
          <Route path='/insights' element={<Insights />} />
        </Route>
        {/* Catch all unmatched routes and not auth and redirect to home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
