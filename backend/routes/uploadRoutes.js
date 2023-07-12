const express = require("express");
const router = express.Router();
const {
  createPost,
  getList,
  deletePost,
} = require("../controllers/UploadsController");
const upload = require("../middleware/upload");

// get all posts
router.get("/", getList);
router.post("/", upload.array("images"), createPost);
// delete a contact
router.delete("/:id", deletePost);

module.exports = router;
