import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'
import { CaptainDataContext } from '../context/CaptainContext'
import { useContext } from 'react'

const CaptainProtectedWrapper = ({ children }) => {
  const token = localStorage.getItem('captainToken')
  const navigate = useNavigate()
  const hasToasted = useRef(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const { captain, setCaptain } = useContext(CaptainDataContext)

  useEffect(() => {
    if (!token && !hasToasted.current) {
      navigate('/captain-login')
      toast.error('Unauthorized access')
      hasToasted.current = true
    }
  }, [token, navigate])

  axios.get(`${import.meta.env.VITE_BASE_URL}/api/captains/profile`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(response => {
    if (response.status === 200) {
      setCaptain(response.data.captain)
      setIsLoaded(true)
    }
  }).catch(error => {
    localStorage.removeItem('captainToken')
    navigate('/captain-login')
  })

  // If there's no token, don't render the children at all
  if (!token) {
    return null 
  }

  if (!isLoaded) {
    return (
      <div>Loading...</div>
    )
  }
  
  return (
    <>
      {children}
    </>
  )
}

export default CaptainProtectedWrapper