import React from 'react'
import timeAgo from '../utils/timeInterval'
import { useNavigate } from 'react-router-dom'

function VideoCard({video}) {
  const navigate = useNavigate()
  const time=timeAgo(video.createdAt)

  const cardClickHandler = () => {
    navigate(`/v/${video._id}`)
  }

  return (
    <div onClick={cardClickHandler} className="w-full hover:cursor-pointer">
      <div className="relative mb-2 w-full pt-[56%]">
        <div className="absolute inset-0">
          <img
            src={video.thumbnailFile}
            alt={video.title}
            className="h-full w-full" />
        </div>
        <span className="absolute bottom-1 right-1 inline-block rounded bg-black px-1.5 text-sm">{video.duration}</span>
      </div>
      <div className="flex gap-x-2">
        <div className="h-10 w-10 shrink-0">
          <img
            src={`${video.owner[0].avatar}`}
            alt="video.owner.username"
            className="h-full w-full rounded-full" />
        </div>
        <div className="w-full">
          <h6 className="mb-1 font-semibold">{video.title}</h6>
          <p className="flex text-sm text-gray-200">{`132 views | ${time}`}</p>
          <p className="text-sm text-gray-200">{video.owner[0].username}</p>
        </div>
      </div>
    </div>
  )
}

export default VideoCard