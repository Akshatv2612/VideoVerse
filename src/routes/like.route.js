import { Router } from "express";
import { likeVideo, likeComment, getLikedVideos } from "../controllers/like.controller";
import { secureVerifyJWT } from "../middlewares/auth.middleware";

const router = Router()

router.use(secureVerifyJWT)

router.route("/toggle/v/:videoId").post(likeVideo)
router.route("/toggle/c/:commentId").post(likeComment)
router.route("/videos").get(getLikedVideos)