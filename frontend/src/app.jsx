import React from 'react'
import Header from './components/header/Header'
import Sidebar from './components/sidebar/Sidebar'
import { Outlet } from 'react-router-dom'

function App() {
    return (
        <div className="h-screen overflow-y-auto bg-[#121212] text-white">
            <Header />
            <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
                <Sidebar />
                <Outlet/>
            </div>
        </div>
    )
}

export default App