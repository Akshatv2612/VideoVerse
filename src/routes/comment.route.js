import { Router } from "express";
import {
    createComment,
    editComment,
    deleteComment,
    getAllvideoComments
} from "../controllers/comment.controller.js";
import { secureVerifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.use(secureVerifyJWT)

router.route("/v/:videoId")
    .post(createComment)
    .get(getAllvideoComments)

router.route("/c/:commentId")
    .patch(editComment)
    .delete(deleteComment)

export default router