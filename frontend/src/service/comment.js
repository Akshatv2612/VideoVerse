import { deleteComment } from "../../../backend/src/controllers/comment.controller";
import conf from "../conf/conf";

const serverUrl = conf.serverUrl;
const type = conf.type;
const version = conf.version;

export class CommentService{
    async getAllComments(videoId) {
        try {
            const res = await fetch(`${serverUrl}${type}/${version}/comments/v/${videoId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            return await res.json()

        } catch (error) {
            console.log('Error::service/comment.js::Error while fetching comments', error)
        }
    }

    async createComment(videoId, content) {
        try {
            const res = await fetch(`${serverUrl}${type}/${version}/comments/v/${videoId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({content}),
                credentials: "include"
            })
            return await res.json()

        } catch (error) {
            console.log('Error::service/comment.js::Error while creating comment', error)
        }
    }

    async editComment(commentId, content) {
        try {
            const res = await fetch(`${serverUrl}${type}/${version}/comments/c/${commentId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({content}),
                credentials: "include"
            })
            return await res.json()

        } catch (error) {
            console.log('Error::service/comment.js::Error while editing comment', error)
        }
    }

    async deleteComment(commentId) {
        try {
            const res = await fetch(`${serverUrl}${type}/${version}/comments/c/${commentId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })
            return await res.json()

        } catch (error) {
            console.log('Error::service/comment.js::Error while deleting comment', error)
        }
    }
}

const commentService = new CommentService
export default commentService
