import { Route, Routes } from 'react-router-dom'
import Home from './pages/HomePage.jsx'
import UserLogin from './pages/UserLogin.jsx'
import UserSignup from './pages/UserSignupPage.jsx'
import CaptainLogin from './pages/CaptainLogin.jsx'
import CaptainSignup from './pages/CaptainSignup.jsx'
import MainPage from './pages/MainPage.jsx'
import UserProtectedWrapper from './pages/UserProtectedWrapper.jsx'
import Logut from './pages/Logut.jsx'
import { Toaster } from 'react-hot-toast'
import MainCaptain from './pages/MainCaptain.jsx'
import CaptainProtectedWrapper from './pages/captainProtectedWrapper.jsx'
import CaptainLogout from './pages/captainLogout.jsx'

const App = () => {
  return (
    <div>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/captain-signup" element={<CaptainSignup />} />
        <Route path="/main" element={
          <UserProtectedWrapper>
            <MainPage />
          </UserProtectedWrapper>} />
        <Route path="/logout" element={
          <UserProtectedWrapper>
            <Logut />
          </UserProtectedWrapper>
        } />
        <Route path="/captain-main" element={
          <CaptainProtectedWrapper>
            <MainCaptain />
          </CaptainProtectedWrapper>
        } />
        <Route path="/captain-logout" element={
          <CaptainProtectedWrapper>
            <CaptainLogout />
          </CaptainProtectedWrapper>
        } />
      </Routes>
    </div>
  )
}

export default App