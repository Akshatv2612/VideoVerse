import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {Provider} from 'react-redux'
import store from './store/store.js'
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import Signup from './pages/Signup.jsx'  
import Login from './pages/Login.jsx'

const router=createBrowserRouter([{
  path:'signup',
  element:(<Signup/>)
},{
  path:'login',
  element:(<Login/>)
},{
  path:'/',
  element:(<>Home</>)
}])

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>
)
