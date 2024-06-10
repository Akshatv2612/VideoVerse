import React, { useEffect } from 'react'
import NoContent from '../components/NoContent'
import { PlayIcon } from '../components/icons'
import VideoCard from '../components/VideoCard'
import { useDispatch, useSelector } from 'react-redux'
import videoService from '../service/video.js'
import { setError, setLoading, setVideos } from '../slices/videoSlice'

function Home() {
    const videos = useSelector(state => state.video.videos)
    const loading = useSelector(state => state.video.loading)
    const dispatch = useDispatch()

    console.log(videos)

    useEffect(() => {
        setLoading(true)
        videoService.getVideos()
        .then(res => {
            if(res.statusCode===200){
                dispatch(setVideos(res.data.docs))
            }
            else
            {
                dispatch(setError(res.message))
            }
        })
        setLoading(false);
    },[])

    return (
        <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
            {loading ?
                <div>Loading</div>
             :
                (
                    videos.length === 0
                        ?
                        <NoContent title={"No videos available"} description={"There are no videos here available. Please try to search some thing else."}>
                            <PlayIcon />
                        </NoContent>
                        :
                        <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4 p-4">
                            {
                                videos.map((video, index) => (
                                    <VideoCard key={video._id} video={video} />
                                ))
                            }
                        </div>
                )
            }
        </section>
    )
}

export default Home