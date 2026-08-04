import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import './index.css'
import App from './App.jsx'
import Register from './Register.jsx'
import Login from './login.jsx'
import Usersync from './Usersync.jsx'
import Edit from './Edit.jsx'
import UserForm from './Userform.jsx'

const router = createBrowserRouter([
  {
    path: "/register",
    element: <Register/>
  },
  {
    path: "/",
    element: <Login/>
  },
  {
    element: <App/>,
    children: [
      { path: "/Usersync", element: <Usersync/> },
      { path: "/UserForm", element: <UserForm/> },
      { path: "/todo/:id", element: <Edit/> },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)