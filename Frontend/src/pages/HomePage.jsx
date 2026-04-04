import React from 'react'
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <div className='bg-cover bg-left bg-[url(https://plus.unsplash.com/premium_photo-1731842686156-74895c29a87b?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dHJhZmZpYyUyMGxpZ2h0fGVufDB8fDB8fHww)] flex pt-8 justify-between h-screen flex-col w-full bg-white'>
        <img className='w-20 ml-8' src="https://www.movex.ai/assets/images/uber_clone.png" alt="Uber Clone" />
        <div className='bg-white pb-8 py-4 px-4'>
          <h2 className='text-2xl font-bold'>Get started with UberC</h2>
          <Link to="/login" className='w-full bg-black text-white py-2 rounded mt-4 block text-center'>Continue</Link>
        </div>
      </div>
    </div>
  )
};

export default Home;