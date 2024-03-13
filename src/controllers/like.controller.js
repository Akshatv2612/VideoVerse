import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { Like } from "../models/like.model";

const likeVideo = asyncHandler(async (req,res)=>{
    const videoId=req.params.videoId
    if(!videoId)
    {
        throw new ApiError(400,"No video like")
    }

    const userId=req.user?._id
    if(!userId)
    {
        throw new ApiError(410,"User not logged in")
    }

    const like=await Like.create({
        user:userId,
        video:videoId,
    })

    if(!like)
    {
        throw new ApiError(420,"Not able to like the video")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200,like,"Video liked successfully")
    )
})

const likeComment = asyncHandler(async(req,res)=>{
    const commentId=req.params?.commentId
    if(!commentId)
    {
        throw new ApiError(400,"No comment to like")
    }

    const userId=req.user?._id
    if(!userId)
    {
        throw new ApiError(400,"User not logged in")
    }

    const like=await Like.create({
        user:userId,
        comment:commentId
    })

    if(!like)
    {
        throw new ApiError(400,"Not able to like the comment")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200,like,"Comment liked successfuly")
    )
})

const getLikedVideos =asyncHandler(async(req,res)=>{
    const userId=req.user?._id
})

export {
    likeVideo,
    likeComment,
    getLikedVideos
}