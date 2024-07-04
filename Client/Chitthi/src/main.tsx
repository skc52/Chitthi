import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RegisterForm from './Authentication/Register.tsx';
import LoginForm from './Authentication/LoginForm.tsx';
import SendLetterForm from './Letter/SendLetter.tsx';
import LetterInbox from './Letter/LetterInbox.tsx';
import LetterView from './Letter/LetterView.tsx';
import LetterDashboard from './Letter/LetterDashboard.tsx';
import Navbar from './Navbar/Navbar.tsx';
import Layout from './Layout/Layout.tsx';
import Profile from './Profile/Profile.tsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout/>}>
      <Route index element={<App />} />
      <Route path="register" element={<RegisterForm />} />
      <Route path="profile" element={<Profile/>} />

      <Route path="login" element={<LoginForm />} />
      <Route path="letter/new" element={<SendLetterForm />} />
      <Route path="letter/dashboard" element={<LetterDashboard />} />
      {/* Add more routes here as needed */}
    </Route>
  )
);
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <Navbar/> */}
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
