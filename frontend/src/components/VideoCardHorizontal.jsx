import React from 'react'
import timeAgo from '../utils/timeInterval'
import { useNavigate } from 'react-router-dom'

function VideoCardHorizontal({video}) {
    const time= timeAgo(video.createdAt)
    const navigate = useNavigate()

  const cardClickHandler = () => {
    navigate(`/v/${video._id}`)
  }
    return (
        <div onClick={cardClickHandler} className="w-full gap-x-2 border pr-2 md:flex hover:cursor-pointer">
            <div className="relative mb-2 w-full md:mb-0 md:w-5/12">
                <div className="w-full pt-[56%]">
                    <div className="absolute inset-0">
                        <img
                            src={video.thumbnailFile}
                            alt="JavaScript Fundamentals: Variables and Data Types"
                            className="h-full w-full" />
                    </div>
                    <span className="absolute bottom-1 right-1 inline-block rounded bg-black px-1.5 text-sm">{video.duration}</span>
                </div>
            </div>
            <div className="flex gap-x-2 px-2 pb-4 pt-1 md:w-7/12 md:px-0 md:py-0.5">
                <div className="h-12 w-12 shrink-0 md:hidden">
                    <img
                        src={video.owner.avatar}
                        alt="reactpatterns"
                        className="h-full w-full rounded-full" />
                </div>
                <div className="w-full pt-1 md:pt-0">
                    <h6 className="mb-1 text-sm font-semibold">{video.title}</h6>
                    <p className="mb-0.5 mt-2 text-sm text-gray-200">{video.owner.fullname}</p>
                    <p className="flex text-sm text-gray-200">{`123 views | ${time}`}</p>
                </div>
            </div>
        </div>
    )
}

export default VideoCardHorizontal