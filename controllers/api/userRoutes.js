const router = require("express").Router();
const { User } = require("../../models");
const withAuth = require("../../utils/auth");
const bcrypt = require("bcrypt");
const moment = require("moment");
const sequelize = require("../../config/connection");

// Gets current user
router.get("/", withAuth, async (req, res) => {
  res.json(`user_id: ${req.session.user_id}`);
});

// CREATE new user
router.post("/", async (req, res) => {
  try {
    const userData = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      sid: req.sessionID,
    });
    req.session.user_id = userData.id;
    req.session.logged_in = true;
    req.session.save(() => {
      res.status(200).json(userData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//POST /api/users/login
router.post("/login", async (req, res) => {
  try {
    //lookup a user based on the email we send from the login page form
    const userData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    //if that user exists, check their password (otherwise say "user not found")
    if (userData) {
      //check password
      const validPassword = await bcrypt.compare(
        req.body.password,
        userData.password
      );
      if (validPassword) {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        req.session.save(() => {
          const response = {
            success: true,
            user: userData,
            message: "You are now logged in!",
          };
          res.send(response)
        });
      } else {
        return res.status(400).json({
          success: false,
          message: "Wrong password :(",
        });
      }
    } else {
      return res.status(404).json({
        success: false,
        message: "User not found :(",
      });
    }
  } catch (e) {
    res.status(500).json(e);
  }
});

router.post("/logout", withAuth, (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.get("/session", async (req, res) => {
  const sid = req.query.sid;
  const sessionData = await sequelize.query(
    `Select createdAt from Sessions where sid = ${sid}`,
    {
      type: sequelize.QueryTypes.SELECT,
    }
  );
  res.send(sessionData)
});

module.exports = router;
