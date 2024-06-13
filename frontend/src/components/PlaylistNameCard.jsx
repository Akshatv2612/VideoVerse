import React from 'react'

function PlaylistNameCard({playlist}) {
    return (
        <label
            className="group/label inline-flex cursor-pointer items-center gap-x-3"
            htmlFor={playlist._id}>
            <input
                type="checkbox"
                className="peer hidden"
                id={playlist._id} />
            <span
                className="inline-flex h-4 w-4 items-center justify-center rounded-[4px] border border-transparent bg-white text-white group-hover/label:border-[#ae7aff] peer-checked:border-[#ae7aff] peer-checked:text-[#ae7aff]">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="3"
                    stroke="currentColor"
                    aria-hidden="true">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"></path>
                </svg>
            </span>
            {playlist.title}
        </label>
    )
}

export default PlaylistNameCard