import { useEffect, useRef, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'
import { UserDataContext } from '../context/UsrContext'

const UserProtectedWrapper = ({ children }) => {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  const hasToasted = useRef(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const { user, setUser } = useContext(UserDataContext)

  useEffect(() => {
    if (!token && !hasToasted.current) {
      navigate('/login')
      toast.error('Unauthorized access')
      hasToasted.current = true
    }
  }, [token, navigate])

  axios.get(`${import.meta.env.VITE_BASE_URL}/api/users/profile`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(response => {
    if (response.status === 200) {
      setUser(response.data.user)
      setIsLoaded(true)
    }
  }).catch(error => {
    localStorage.removeItem('token')
    navigate('/login')
  })

  // if (!token) {
  //   return null 
  // }
  
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

export default UserProtectedWrapper