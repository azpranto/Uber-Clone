import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Logut = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  axios.get(`${import.meta.env.VITE_BASE_URL}/api/users/logout`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then((response) => {
    if (response.status === 200) {
      localStorage.removeItem('token');
      navigate('/login');
    }
  }).catch((error) => {
    console.log(error);
  });

  return (
    <div>Logut</div>
  )
}

export default Logut