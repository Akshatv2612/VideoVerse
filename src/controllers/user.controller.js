import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
    // get user details from frontend
    // validation - not empty
    // check if user already exists: username, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object — create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return response

    const {username, email, fullname, password} = req.body

    if ([username, email, fullname, password].some((field) => field?.trim() === ""))  //?. is optional chainning operator, It will not throw error if method in not there.
    {
        throw new ApiError(400, `${field} is required`);
    }

    const existedUser=User.findOne({
        $or:[{username},{email}]
    })

    if(existedUser)
    {
        throw new ApiError(402,'username or email already present')
    }

    const avatarLocalPath=req.files?.avatar[0]?.path
    const coverImageLocalPath=req.files?.avatar[0]?.path

    if(!avatarLocalPath)
    {
        throw new ApiError(404,'avatar required')
    }

    const avatar=await uploadOnCloudinary(avatarLocalPath);
    const coverImage=await uploadOnCloudinary(coverImageLocalPath);

    if(!avatar)
    {
        throw new ApiError(406,'Avatar not uploaded to cloudinary')
    }

    const user = await User.create({
        username:username.toLowerCase(),
        fullname,
        email,
        avatar:avatar.url,
        coverImage:coverImage?.url || "",
        password
    })

    const createdUser=await User.findOne(user.__id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500,"Something went wrong while registering user")
    }

    return res.status(201).json(
        new ApiResponse(200,createdUser,"user registered successfully")
    )
});

export default registerUser