import React from 'react'
import '../components/styles.css'
import hero from '../assets/hero.svg'

export default function Home() {
  return (
    <div className='Home'>
      <header>
      <i className="fa-brands fa-whatsapp fa-2xl" style={{color: '#63E6BE'}}></i>
        <nav>
          <ul>
            <li><a href='/'>Home</a></li>
            <li><a href='/signup'>Signup</a></li>
            <li><a href='/login'>Login</a></li>
          </ul>
        </nav>
      </header>
      <div className='main'>
        <div className='Hero'>
          <div>
            <h1>HI, WELCOME</h1>
            <h2>REALTIME CHAT APPLICATION</h2>
          </div>
          <div className='btn-holder'>
            <button>
              <a href='/signup'>SIGNUP</a>
            </button>
            <button>
              <a href='/login'>LOGIN</a>
            </button>
          </div>
        </div>
        <img src={hero} alt='hero' />
      </div>

    </div>
  )
}
