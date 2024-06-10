import React from 'react'
import { HomeIcon, LikeIcon, HistoryIcon, CollectionIcon, ContentIcon, SettingIcon, SubscriberIcon, SupportIcon } from '../icons'
import SidebarButton from './SidebarButton'

function Sidebar() {
    return (
        <aside
            className="group fixed inset-x-0 bottom-0 z-40 w-full shrink-0 border-t border-white bg-[#121212] px-2 py-2 sm:absolute sm:inset-y-0 sm:max-w-[70px] sm:border-r sm:border-t-0 sm:py-6 sm:hover:max-w-[250px] lg:sticky lg:max-w-[250px]">
            <ul className="flex justify-around gap-y-2 sm:sticky sm:top-[106px] sm:min-h-[calc(100vh-130px)] sm:flex-col">
                <li className="">
                    <SidebarButton name={"Home"} path="/">
                        <HomeIcon />
                    </SidebarButton>
                </li>
                <li className="hidden sm:block">
                    <SidebarButton name={"Liked Videos"}>
                        <LikeIcon />
                    </SidebarButton>
                </li>
                <li className="">
                    <SidebarButton name={"History"}>
                        <HistoryIcon />
                    </SidebarButton>
                </li>
                <li className="hidden sm:block">
                    <SidebarButton name={"My Content"}>
                        <ContentIcon />
                    </SidebarButton>
                </li>
                <li className="">
                    <SidebarButton name={"Collection"}>
                        <CollectionIcon />
                    </SidebarButton>
                </li>
                <li className="">
                    <SidebarButton name={"Subscribers"}>
                        <SubscriberIcon />
                    </SidebarButton>
                </li>
                <li className="hidden sm:block mt-auto">
                    <SidebarButton name={"Support"}>
                        <SupportIcon />
                    </SidebarButton>
                </li>
                <li className="hidden sm:block">
                    <SidebarButton name={"Setting"}>
                        <SettingIcon />
                    </SidebarButton>
                </li>
            </ul>
        </aside>
    )
}

export default Sidebar

