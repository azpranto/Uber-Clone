import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const CaptainLogout = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem('captainToken');

  axios.get(`${import.meta.env.VITE_BASE_URL}/api/captains/logout`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then((response) => {
    if (response.status === 200) {
      localStorage.removeItem('captainToken');
      navigate('/captain-login');
      toast.success('Logout successful');
    }
  }).catch((error) => {
    console.log(error);
  });

  return null
}

export default CaptainLogout