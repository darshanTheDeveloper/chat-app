import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/styles.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useFetch from '../hooks/useFetch'
import { useUser } from '../components/context/UserContext'
import { socket } from '../socket';

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

export default function Login() {
  const [user, setUser] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [users] = useFetch()
  const { setCurrentUser} = useUser();

  function handleSubmit() {
    setLoading(true);
    const data = users.find((item) => item.username === user.username)
    if (data) {
      if (data.password === user.password) {
        navigate('/app')
        setCurrentUser(data);
        socket.emit('login', { username: data.username, status: 'online' })
      } else {
        toast.error('Incorrect password', toastStyle)
        setLoading(false)
      }
    } else {
      toast.error('Incorrect username', toastStyle)
      setLoading(false)
    }
  }

  return (
    <div className='Login'>
      <form autoComplete='off' autoFocus="off" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
        <h1>LOGIN</h1>
        <div>
          <input
            type='text'
            value={user.username}
            placeholder='Enter the username'
            autoCapitalize='false'
            autoFocus="off"
            autoComplete='off'
            onChange={(e) => {
              setUser((prev) => ({ ...prev, username: e.target.value }));
            }}
          />
          <input
            type='password'
            value={user.password}
            placeholder='Enter the password'
            onChange={(e) => setUser((prev) => ({ ...prev, password: e.target.value }))}
          />
        </div>
        <button type='submit' disabled={loading}>
          {loading ? 'Logging in...' : 'LOGIN'}
        </button>
        <p style={{ textAlign: 'center' }}>need to register? <a href='/signup'>signup</a></p>
      </form>
      <ToastContainer />
    </div>
  );
}
