import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import RegisterForm from './Authentication/Register'
import { Link } from 'react-router-dom'


function App() {

  return (
      <div>

        <h1>Welcome to Chitthi</h1>
        <Link to="register">Register</Link>
        <br />
        <Link to="login">Login</Link>
      </div>
  )
}

export default App
