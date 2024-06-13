import conf from "../conf/conf";

const serverUrl = conf.serverUrl;
const type = conf.type;
const version = conf.version;

export class PlaylistService {
    async getUserPlaylists(userId) {
        try {
            const response = await fetch(`${serverUrl}${type}/${version}/playlists/u/${userId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            })
            return await response.json()
        } catch (error) {
            console.log("Error::service/playlist.js::Error while fetching user playlists", error)
        }
    }

    async createPlaylist(title, description) {
        try {
            const response = await fetch(`${serverUrl}${type}/${version}/playlists`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title, description }),
                credentials: "include"
            })
            return await response.json()
        } catch (error) {
            console.log("Error::service/playlist.js::Error while creating playlist", error)
        }
    
    }
}

const playlistService = new PlaylistService
export default playlistService