import React, { useState } from 'react';
import useFetch from '../hooks/useFetch';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const toastStyle = {
  position: "bottom-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
}

export default function SignUp() {
  const [user, setUser] = useState({ firstName: '', lastName: '', email: '', username: '', password: '' });
  const [users] = useFetch()
  const navigate = useNavigate()

  function onSignup() {
    if (users.find((item) => item.username === user.username)) {
      toast.error('Username already Exists', toastStyle)
    } else if (user.password.length < 8) {
      toast.error(`Password must be having more than ${8} letter`, toastStyle)
    } else if (users.find((item) => item.email === user.email)) {
      toast.error('Email already Exists', toastStyle)
    } else {
      fetch('/api/signup', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
      navigate('/login')
    }
  }

  return (
    <div className='Signup'>
      <form autoComplete='off' onSubmit={(e) => e.preventDefault()}>
        <h1>SIGNUP</h1>
        <div>
          <div className='name'>
            <input
              type='text'
              value={user.firstName}
              placeholder='First Name'
              onChange={(e) => setUser((prev) => ({ ...prev, firstName: e.target.value }))}
            />
            <input
              type='text'
              value={user.lastName}
              placeholder='Last Name'
              onChange={(e) => setUser((prev) => ({ ...prev, lastName: e.target.value }))}
            />
          </div>
          <input
            type='email'
            name="email"
            value={user.email}
            placeholder='Enter the email'
            onChange={(e) => setUser((prev) => ({ ...prev, email: e.target.value }))}
          />
          <input
            type='text'
            name='username'
            value={user.username}
            placeholder='Enter the Username'
            onChange={(e) => setUser((prev) => ({ ...prev, username: e.target.value }))}
          />
          <input
            type='password'
            name="password"
            value={user.password}
            placeholder='Enter the password'
            onChange={(e) => setUser((prev) => ({ ...prev, password: e.target.value }))}
          />
        </div>
        <button onClick={onSignup}>
          SIGNUP
        </button>
        <p style={{ textAlign: 'center' }}>already having account? <a href='/login'>login</a></p>
      </form>
      <ToastContainer />
    </div>
  );
}
