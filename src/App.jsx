import './App.css'
import { Route, Routes } from 'react-router-dom'
import LoginSignUp from './pages/login'
import Journal from './pages/journal'
import ProtectedRoutes from './components/ProtectedRoutes/auth'


function App() {

  return (
    <>
      <Routes>
        <Route path='login' element={<LoginSignUp />} />
        <Route element={<ProtectedRoutes />}>
          {/* Wrap protected content on the protected route */}
          <Route path='journal' element={<Journal />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
