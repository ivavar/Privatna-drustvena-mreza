const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");
const authUser = require("../middleware/authUser");
const normalize = require("normalize-url");

const User = require("../models/User");
const Profile = require("../models/Profile");
const Post = require("../models/Post");

router.get("/me", authUser, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name", "surname", "avatar"]);

    if (!profile) {
      return res
        .status(400)
        .json({ msg: "Ne postoji profil za ovog korisnika." });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post(
  "/",
  [
    authUser,
    [
      check("position", "Poziciju je obvezno unijeti.").not().isEmpty(),
      check("company", "Tvrtku je obvezno unijeti.").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      dateOfBirth,
      phoneNumber,
      company,
      website,
      city,
      bio,
      position,
      languages,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin,
    } = req.body;

    const profileFields = {
      user: req.user.id,
      dateOfBirth,
      phoneNumber,
      company,
      website:
        website && website !== ""
          ? normalize(website, { forceHttps: true })
          : "",
      city,
      bio,
      position,
      languages: Array.isArray(languages)
        ? languages
        : languages.split(",").map((language) => " " + language.trim()),
    };

    const socialFields = { youtube, twitter, instagram, linkedin, facebook };
    for (const [key, value] of Object.entries(socialFields)) {
      if (value && value.length > 0)
        socialFields[key] = normalize(value, { forceHttps: true });
    }
    profileFields.social = socialFields;

    try {
      let profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        return res.json(profile);
      }
      profile = new Profile(profileFields);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

router.get("/", auth, async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", [
      "name",
      "surname",
      "avatar",
    ]);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.get("/:user_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "surname", "avatar"]);
    if (!profile) return res.status(400).json({ msg: "Profil nije pronađen." });
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "Profil nije pronađen." });
    }
    res.status(500).send("Server error");
  }
});

router.delete("/", authUser, async (req, res) => {
  try {
    await Post.deleteMany({ user: req.user.id });
    await Profile.findOneAndRemove({ user: req.user.id });
    await User.findOneAndRemove({ _id: req.user.id });
    res.json({ msg: "Korisnik je izbrisan." });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.put(
  "/experience",
  [
    authUser,
    [
      check("title", "Naziv posla je obvezno unijeti.").not().isEmpty(),
      check("company", "Tvrtku je obvezno unijeti.").not().isEmpty(),
      check("from", "Datum početka je obvezno unijeti.").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    } = req.body;

    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.experience.unshift(newExp);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

router.delete("/experience/:exp_id", authUser, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    const removeIndex = profile.experience
      .map((item) => item.id)
      .indexOf(req.params.exp_id);
    profile.experience.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.put(
  "/education",
  [
    authUser,
    [
      check("school", "Ustanovu je obvezno unijeti.").not().isEmpty(),
      check("degree", "Razinu je obvezno unijeti.").not().isEmpty(),
      check("fieldofstudy", "Područje je obvezno unijeti.").not().isEmpty(),
      check("from", "Datum početka je obvezno unijeti.").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    } = req.body;

    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.education.unshift(newEdu);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

router.delete("/education/:edu_id", authUser, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    const removeIndex = profile.education
      .map((item) => item.id)
      .indexOf(req.params.edu_id);
    profile.education.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/avatar", authUser, async (req, res) => {
  try {
    let profile = await Profile.findOne({ user: req.user.id });
    profile.picture = req.body.picture;
    await profile.save();
    return res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.delete("/avatar", authUser, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    profile.picture = "";
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post(
  "/experience/:exp_id",
  [
    authUser,
    [
      check("title", "Naziv posla je obvezno unijeti.").not().isEmpty(),
      check("company", "Tvrtku je obvezno unijeti.").not().isEmpty(),
      check("from", "Datum početka je obvezno unijeti.").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    } = req.body;
    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      const replaceIndex = profile.experience
        .map((item) => item.id)
        .indexOf(req.params.exp_id);
      profile.experience.splice(replaceIndex, 1, newExp);

      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

router.post(
  "/education/:edu_id",
  [
    authUser,
    [
      check("school", "Ustanovu je obvezno unijeti.").not().isEmpty(),
      check("degree", "Razinu je obvezno unijeti.").not().isEmpty(),
      check("fieldofstudy", "Područje je obvezno unijeti.").not().isEmpty(),
      check("from", "Datum početka je obvezno unijeti.").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    } = req.body;
    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      const replaceIndex = profile.education
        .map((item) => item.id)
        .indexOf(req.params.edu_id);
      profile.education.splice(replaceIndex, 1, newEdu);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
