import express from "express";

import {
    login,
    logout,
    register,
    userStatus,
} from "../controllers/AuthController.js";

const router = express.Router();

router.route("/").get(userStatus);
router.route("/logout").post(logout)
router.route("/login").post(login);
router.route("/register").post(register);

// module.exports = router;
export default router;
