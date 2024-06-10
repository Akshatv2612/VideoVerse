import conf from '../conf/conf'

const serverUrl = conf.serverUrl
const type = conf.type
const version = conf.version

export class VideoService {
    async getVideos() {
        try {
            const res = await fetch(`${serverUrl}${type}/${version}/videos`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            return await res.json()

        } catch (error) {
            console.log('Error::service/video.js::Error while fetching videos',error)
        }
    }
}

const videoService= new VideoService
export default videoService