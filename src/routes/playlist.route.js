import { Router } from "express";
import {
    createPlaylist,
    getUserPlaylists,
    getPlaylistById,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    deletePlaylist,
    updatePlaylist
} from "../controllers/playlist.controller.js";
import { secureVerifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()
router.use(secureVerifyJWT)

router.route("/")
    .post(createPlaylist)

router.route("/u/:userId")
    .get(getUserPlaylists)

router.route("/:playlistId")
    .get(getPlaylistById)
    .patch(updatePlaylist)
    .delete(deletePlaylist)

router.route("/add/:playlistId/:videoId")
    .patch(addVideoToPlaylist)

router.route("/remove/:playlistId/:videoId")
    .patch(removeVideoFromPlaylist)

export default router