const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const authUser = require("../middleware/authUser");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");

const User = require("../models/User");
const Profile = require("../models/Profile");

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.satus(500).send("Server error");
  }
});

router.get("/profile", authUser, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.satus(500).send("Server error");
  }
});

router.post(
  "/",
  [
    check("email", "Unesite ispravnu elektroničku adresu.").isEmail(),
    check("password", "Lozinku je obvezno unijeti.").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ errors: [{ msg: "Neispravni podaci." }] });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ errors: [{ msg: "Neispravni podaci." }] });
      }
      const payload = {
        user: {
          id: user.id,
          role: user.role,
        },
      };
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: "3 days" },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

router.post(
  "/settings",
  [
    authUser,
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
    const accountFields = {};
    accountFields._id = req.user.id;
    if (name) accountFields.name = name;
    if (surname) accountFields.surname = surname;
    if (email) accountFields.email = email;
    if (password) accountFields.password = password;
    try {
      let user = await User.findOne({ _id: req.user.id });
      if (user) {
        const salt = await bcrypt.genSalt(10);
        accountFields.password = await bcrypt.hash(password, salt);
        user = await User.findOneAndUpdate(
          { _id: req.user.id },
          { $set: accountFields },
          { new: true }
        );
        return res.json(user);
      }
      await user.save();
      const payload = {
        user: {
          id: user.id,
          role: user.role,
        },
      };
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: "3 days" },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Elektronička adresa nije jedinstvena." }] });
    }
  }
);

module.exports = router;
