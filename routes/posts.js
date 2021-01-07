const express = require("express");
const router = express.Router();
const { validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const authUser = require("../middleware/authUser");

const Post = require("../models/Post");
const Profile = require("../models/Profile");
const User = require("../models/User");

router.post("/", authUser, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.findById(req.user.id).select("-password");
    const profile = await Profile.findOne({ user: req.user.id });
    const newPost = new Post({
      text: req.body.text,
      fileURL: req.body.fileURL,
      name: user.name,
      surname: user.surname,
      avatar: user.avatar,
      picture: profile.picture,
      user: req.user.id,
    });

    if (newPost.text !== "" || newPost.fileURL !== "") {
      const post = await newPost.save();
      res.json(post);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.get("/profile-posts/:id", auth, async (req, res) => {
  try {
    const posts = await Post.find({ user: req.params.id }).sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "Objava nije pronađena." });
    }
    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Objava nije pronađena." });
    }
    res.status(500).send("Server error");
  }
});

router.delete("/:id", authUser, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "Objava nije pronađena." });
    }
    if (post.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ msg: "Korisnik nije ovlašten izbrisati tu objavu" });
    }
    await post.remove();
    res.json({ msg: "Objava je izbrisana." });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.put("/like/:id", authUser, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res
        .status(400)
        .json({ msg: "Objava je već označena da vam se sviđa." });
    }
    post.likes.unshift({ user: req.user.id });
    await post.save();
    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.put("/unlike/:id", authUser, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res
        .status(400)
        .json({ msg: "Objava nije još ni označena da vam se sviđa." });
    }
    const removeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);
    post.likes.splice(removeIndex, 1);
    await post.save();
    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/comment/:id", authUser, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const user = await User.findById(req.user.id).select("-password");
    const post = await Post.findById(req.params.id);
    const profile = await Profile.findOne({ user: req.user.id });
    const newComment = {
      text: req.body.text, 
      fileURL: req.body.fileURL,
      name: user.name,
      surname: user.surname,
      avatar: user.avatar,
      picture: profile.picture,
      user: req.user.id,
    };
    post.comments.unshift(newComment);
    await post.save();
    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.delete("/comment/:id/:comment_id", authUser, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );
    if (!comment) {
      return res.status(404).json({ msg: "Komentar ne postoji." });
    }
    if (comment.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ msg: "Korisnik nije ovlašten izbrisati taj komentar." });
    }
    const removeIndex = post.comments
      .map((comment) => comment.id)
      .indexOf(req.params.comment_id);
    post.comments.splice(removeIndex, 1);
    await post.save();
    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
