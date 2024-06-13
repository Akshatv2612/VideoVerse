import conf from "../conf/conf";

const serverUrl = conf.serverUrl;
const type = conf.type;
const version = conf.version;

export class ChannelService{
    async getChannelInfo(channelId) {
        try {
            const res = await fetch(`${serverUrl}${type}/${version}/users/c/${channelId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })
            return await res.json()

        } catch (error) {
            console.log('Error::service/channel.js::Error while fetching channel info', error)
        }
    }
}

const channelService = new ChannelService
export default channelService