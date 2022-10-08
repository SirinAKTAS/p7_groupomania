const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user.controller");

// Routes d'authentification 
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.get("/logout", userCtrl.logout);

// Routes d'user
router.get("/", userCtrl.getAllUsers);
router.get("/:id", userCtrl.getOneUser);
router.put("/:id", userCtrl.modifyUser);

module.exports = router;