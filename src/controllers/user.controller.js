import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Jwt from "jsonwebtoken";

const generateAccessTokenAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })  //since 'save' validate each field and here we don't have password etc. 

        return { accessToken, refreshToken }
    }
    catch (error) {
        throw new ApiError(406, "Error while generating Access Token or Refresh Token", error)
    }
}

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

    const { username, email, fullname, password } = req.body

    if ([username, email, fullname, password].some((field) => field?.trim() === ""))  //?. is optional chainning operator, It will not throw error if method in not there.
    {
        throw new ApiError(400, `${field} is required`);
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        throw new ApiError(402, 'username or email already present')
    }

    const avatarLocalPath = req.files?.avatar[0]?.path
    let coverImageLocalPath;
    if (req.files?.coverimage) {
        coverImageLocalPath = req.files?.coverimage[0].path
    }


    if (!avatarLocalPath) {
        throw new ApiError(404, 'avatar required')
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);


    if (!avatar) {
        throw new ApiError(406, 'Avatar not uploaded to cloudinary')
    }

    const user = await User.create({
        username: username.toLowerCase(),
        fullname,
        email,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        password
    })

    const createdUser = await User.findOne(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "user registered successfully")
    )
});

const loginUser = asyncHandler(async (req, res) => {
    //Get data from user
    //check data
    //find data in database
    //password check
    //create access and refresh token
    //send tokens through cookie

    const { username, email, password } = req.body
    if (!(username || email)) {
        throw new ApiError(400, "Username or Email is required")
    }

    const user = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (!user) {
        throw new ApiError(401, "User not registered")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if (!isPasswordValid) {
        throw new ApiError(402, "Password Incorrect")
    }

    const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser, accessToken, refreshToken
                },
                "Logged In Successfully"
            )
        )
})

const logoutUser = asyncHandler(async (req, res) => {
    const userr = await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(
            new ApiResponse(
                200,
                {},
                "User Logged Out Successfully"
            )
        )
})

const refreshAccessToken = asyncHandler(async (req, res) => {

    const userRefreshToken = req.cookies.refreshToken || req.body.refreshToken
    if (!userRefreshToken) {
        throw new ApiError(401, "unauthorized request")
    }

    try {
        const decodedRefreshToken = Jwt.verify(userRefreshToken, process.env.REFRESH_TOKEN_SECRET)

        const user = await User.findById(decodedRefreshToken._id)

        if (!user) {
            throw new ApiError(402, "Refresh Token is invalid")
        }

        if (userRefreshToken !== user.refreshToken) {
            throw new ApiError(403, "Refresh Token Not Matched")
        }
        const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(user._id)

        const options = {
            httpOnly: true,
            secure: true
        }

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    {
                        accessToken: accessToken,
                        refreshToken: refreshToken
                    },
                    "Access Token Refreshed Successfully"
                )
            )
    } catch (error) {
        throw new ApiError(404, "Unable to refresh Access Token", error)
    }
})

const changeCurrentPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body
    if (!oldPassword) throw new ApiError(401, "Old Password is required")
    if (!newPassword) throw new ApiError(401, "New Password is required")

    const user = await User.findById(req.user?._id)

    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)

    if (!isPasswordCorrect) {
        throw new ApiError(401, "Incorrect Old Password")
    }

    user.password = newPassword
    await user.save({ validateBeforeSave: false })

    return res
        .status(200)
        .json(
            new ApiResponse(200, {}, "Password Changed Successfully")
        )
})

const getCurrentUser = asyncHandler(async (req, res) => {
    res
        .status(200)
        .json(
            new ApiResponse(200, req.user, "Current User fetched Succcessfully")
        )
})

const updateAccountDetails = asyncHandler(async (req, res) => {
    const { fullname, email } = req.body

    if (!fullname && !email) {
        throw new ApiError(404, "Enter a field to update")
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                fullname: fullname,
                email: email
            }
        },
        {
            new: true
        }
    ).select("-password -refreshToken")

    return res
        .status(200)
        .json(
            new ApiResponse(200, {}, "Account Details Updated Successfully")
        )
})

const updateUserAvatar = asyncHandler(async (req, res) => {
    const avatarLocalPath = req.file?.path

    if(!avatarLocalPath){
        throw new ApiError(404,"Image not added")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const user = await User.findById(req.user?._id)

    if(!user){
        throw new ApiError(404,"Error while updating avatar")
    }

    user.avatar = avatar.url
    await user.save({ validateBeforeSave: false })

    return res
        .status(200)
        .json(
            new ApiResponse(200, {}, "Avatar Updated Successfully")
        )
})

const updateUserCoverImage=asyncHandler(async (req,res)=>{
    const coverImageLocalPath=req.file?.path

    const coverImage=uploadOnCloudinary(coverImageLocalPath)
    const user=await User.findById(req.user?._id)

    if(!user){
        throw new ApiError(404,"Error while updating coverImage")
    }

    user.coverimage=coverImage
    user.save({validateBeforeSave:false})

    return res
    .status(200)
    .json(
        new ApiResponse(200,{},"Cover Image Updated Successfully")
    )
})

export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails,
    updateUserAvatar,
    updateUserCoverImage
}