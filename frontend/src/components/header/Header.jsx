import React from 'react'
import { ContentIcon, CrossIcon, LikeIcon, Logo, SearchIcon, SettingIcon, SupportIcon } from '../icons'
import SidebarButton from '../sidebar/SidebarButton.jsx'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import authService from '../../service/auth.js'
import { useDispatch } from 'react-redux'
import { logout } from '../../slices/authSlice.js'

function Header() {
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
    const dispatch=useDispatch()

    const logoutHandler = async (e) => {
        e.preventDefault()
        authService.logoutUser()
        .then(res => {
            dispatch(logout())
        })
    }

    return (
        <header className="sticky inset-x-0 top-0 z-50 w-full border-b border-white bg-[#121212] px-4">
            <nav className="mx-auto flex max-w-7xl items-center py-2">
                <div className="mr-4 w-2 shrink-0 sm:w-16">
                    <Logo height={60} width={60} />
                </div>
                <div className="relative mx-auto hidden w-full max-w-md overflow-hidden sm:block">
                    <input
                        className="w-full border bg-transparent py-1 pl-8 pr-3 placeholder-white outline-none sm:py-2"
                        placeholder="Search" />
                    <SearchIcon className={"absolute left-2.5 top-1/2 inline-block -translate-y-1/2"} />
                </div>
                <button className="ml-auto sm:hidden">
                    <SearchIcon height='w-6' width='w-6' />
                </button>
                <button className="group peer ml-4 flex w-6 shrink-0 flex-wrap gap-y-1.5 sm:hidden">
                    <span className="block h-[2px] w-full bg-white group-hover:bg-[#ae7aff]"></span>
                    <span className="block h-[2px] w-2/3 bg-white group-hover:bg-[#ae7aff]"></span>
                    <span className="block h-[2px] w-full bg-white group-hover:bg-[#ae7aff]"></span>
                </button>
                <div
                    className="fixed inset-y-0 right-0 flex w-full max-w-xs shrink-0 translate-x-full flex-col border-l border-white bg-[#121212] duration-200 hover:translate-x-0 peer-focus:translate-x-0 sm:static sm:ml-4 sm:w-auto sm:translate-x-0 sm:border-none">
                    <div className="relative flex w-full items-center justify-between border-b border-white px-4 py-2 sm:hidden">
                        <Logo width={40} height={40} />
                        <button className="inline-block w-8">
                            <CrossIcon />
                        </button>
                    </div>
                    <ul className="my-4 flex w-full flex-wrap gap-2 px-4 sm:hidden">
                        <li className="w-full">
                            <SidebarButton name={"Liked Videos"}>
                                <LikeIcon />
                            </SidebarButton>
                        </li>
                        <li className="w-full">
                            <SidebarButton name={"My Content"}>
                                <ContentIcon />
                            </SidebarButton>
                        </li>
                        <li className="w-full">
                            <SidebarButton name={"Support"}>
                                <SupportIcon />
                            </SidebarButton>
                        </li>
                        <li className="w-full">
                            <SidebarButton name={"Setting"}>
                                <SettingIcon />
                            </SidebarButton>
                        </li>
                    </ul>
                    {
                        isLoggedIn ?
                            <div className="mb-8 mt-auto flex w-full flex-wrap gap-4 px-4 sm:mb-0 sm:mt-0 sm:items-center sm:px-0">
                                <button
                                    onClick={logoutHandler}
                                    className="mr-1 w-full bg-[#ae7aff] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] sm:w-auto">
                                    Log out
                                </button>
                            </div> :
                            <div className="mb-8 mt-auto flex w-full flex-wrap gap-4 px-4 sm:mb-0 sm:mt-0 sm:items-center sm:px-0">
                                <Link to={"/login"}
                                    className="w-full bg-[#383737] px-3 py-2 hover:bg-[#4f4e4e] sm:w-auto sm:bg-transparent">
                                    Log in
                                </Link>
                                <Link to={"/signup"}
                                    className="mr-1 w-full bg-[#ae7aff] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] sm:w-auto">
                                    Sign up
                                </Link>
                            </div>
                    }
                </div>
            </nav>
        </header>
    )
}

export default Header