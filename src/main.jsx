import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'
import RegisterEvent from './components/RegisterEvent.jsx'

const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      <Route path='' element={<App/>}/>
      {/* <Route path='/login' element={<Login/>}/> */}
      <Route path='/logint' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      {/* <Route path='/registerev/:eventname' element={<RegisterEvent/>}/> */}
      <Route path='/registerevs/:eventname' element={<RegisterEvent/>}/>
      </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)

