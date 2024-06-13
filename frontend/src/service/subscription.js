import conf from "../conf/conf";

const serverUrl = conf.serverUrl;
const type = conf.type;
const version = conf.version;

export class SubscribeService {
    async toggleSubscription(channelId) {
        try {
            const res = await fetch(`${serverUrl}${type}/${version}/subscriptions/c/${channelId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })
            return await res.json()
        } catch (error) {
            console.log('Error::service/subscribe.js::Error while subscribing', error)
        }
    }
}

const subscribeService = new SubscribeService();
export default subscribeService;