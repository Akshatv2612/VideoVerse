import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Signup from './pages/Signup.jsx'
import Login from './pages/Login.jsx'
import Home from './pages/Home.jsx'
import App from './app.jsx'
import VideoDetail from './pages/VideoDetail.jsx'

const router = createBrowserRouter([{
  path: 'signup',
  element: (<Signup />)
},
{
  path: 'login',
  element: (<Login />)
},
{
  path: '/',
  element: (<App />),
  children: [
    {
      path: '/',
      element: (<Home />)
    },
    {
      path: '/v/:videoId',
      element: (<VideoDetail />)
    }
  ]
}])

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
