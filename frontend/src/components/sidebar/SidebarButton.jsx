import React from 'react'
import { Link } from 'react-router-dom'

function SidebarButton({children, name, path}) {
    return (
        <Link to={path}
            className="flex flex-col items-center justify-center border-white py-1 focus:text-[#ae7aff] sm:w-full sm:flex-row sm:border sm:p-1.5 sm:hover:bg-[#ae7aff] sm:hover:text-black sm:focus:border-[#ae7aff] sm:focus:bg-[#ae7aff] sm:focus:text-black sm:group-hover:justify-start sm:group-hover:px-4 lg:justify-start lg:px-4">
            {children}
            <span className="block sm:hidden sm:group-hover:inline lg:inline">{name}</span>
        </Link>
    )
}

export default SidebarButton