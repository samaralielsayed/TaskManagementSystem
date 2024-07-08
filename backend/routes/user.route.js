const express = require("express");
const router = express.Router();
const users = require("../controllers/user.controller");
const validate = require("../validations/user.validation");
const { protect } = require("../middlewares/auth");
const { upload } = require("../middlewares/multer");
const { uploadImage } = require("../middlewares/firebase");

router.post("/register", validate.register, users.register);
router.post("/login", users.login);
router.get("/userProfile", protect, users.findUseProfile);
router.put(
  "/userProfile",
  upload,
  uploadImage,
  protect,
  validate.update,
  users.updateUser
);

module.exports = router;
