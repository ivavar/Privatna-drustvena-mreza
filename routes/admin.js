const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const normalize = require("normalize-url");

const User = require("../models/User");
const Profile = require("../models/Profile");
const Post = require("../models/Post");

const authAdmin = require("../middleware/authAdmin");

router.get("/users", authAdmin, async (req, res) => {
  try {
    const users = await User.find({ role: "user" })
      .select("-password")
      .sort({ name: 1 });
    res.json(users);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

router.delete("/users/:id", authAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: "Korisnik nije pronađen." });
    }
    await Profile.findOneAndRemove({ user: req.params.id });
    await Post.deleteMany({ user: req.params.id });
    await user.remove();
    res.json({ msg: "Korisnik je izbrisan." });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post(
  "/register",
  [
    authAdmin,
    [
      check("name", "Ime je obvezno unijeti.").not().isEmpty(),
      check("surname", "Prezime je obvezno unijeti.").not().isEmpty(),
      check("email", "Unesite ispravnu elektroničku adresu.").isEmail(),
      check("password", "Lozinka mora sadržavati najmanje 6 znakova.").isLength({
        min: 6,
      }),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, surname, email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Korisnik već postoji." }] });
      }
      const avatar = normalize(
        gravatar.url(email, {
          s: "200",
          r: "pg",
          d: "mm",
        }),
        { forceHttp: true }
      );
      user = new User({
        name,
        surname,
        email,
        avatar,
        password,
      });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
      return res.json();
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
