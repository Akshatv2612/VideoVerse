import React,{useState} from 'react'
import timeAgo from '../utils/timeInterval'
import commentService from '../service/comment'
import {useDispatch, useSelector } from 'react-redux'
import { setComments } from '../slices/commentSlice'

function CommentCard({comment}) {
    const time= timeAgo(comment.createdAt)
    const [content, setContent] = useState(comment.content)
    const comments=useSelector((state) => state.comment.comments)
    const dispatch=useDispatch()

    const editHandler = () => {
        commentService.editComment(comment._id, content)
        .then((res) => {
            comment.content=content
            setContent('')
        })
    }

    const deleteHandler = () => {
        commentService.deleteComment(comment._id)
        .then((res) => {
            const newComments=comments.filter((c) => c._id !== comment._id)
            dispatch(setComments(newComments))
        })
    }

    return (
        <div>
            <div className="flex gap-x-4">
                <div className="mt-2 h-11 w-11 shrink-0">
                    <img
                        src={comment.owner[0].avatar}
                        alt="sarahjv"
                        className="h-full w-full rounded-full" />
                </div>
                <div className="block">
                    <p className="flex items-center text-gray-200">
                        {comment.owner[0].fullname}
                        <span className="text-sm pl-2">{time}</span>
                    </p>
                    <p className="text-sm text-gray-200">{`@${comment.owner[0].username}`}</p>
                    <p className="mt-3 text-sm">{comment.content}</p>
                </div>
            </div>
            <hr className="my-4 border-white" />
        </div>
    )
}

export default CommentCard