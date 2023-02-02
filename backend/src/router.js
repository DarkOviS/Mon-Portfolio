const express = require("express");

const router = express.Router();
const { hashPassword, verifyPassword, verifyToken } = require("./auth");

const userControllers = require("./controllers/userControllers");
const skillControllers = require("./controllers/skillControllers");
const projectControllers = require("./controllers/projectControllers");

router.post(
  "/login",
  userControllers.getUserByEmailWithPasswordAndPassToNext,
  verifyPassword
);

router.get("/skills", skillControllers.browse);
router.get("/skills/:id", skillControllers.read);

router.get("/projects", projectControllers.browse);
router.get("/projects/:id", projectControllers.read);

router.use(verifyToken); // authentication wall

router.get("/users", userControllers.browse);
router.post("/users", hashPassword, userControllers.add);
router.get("/users/:id", userControllers.read);
router.put("/users/:id", userControllers.edit);

router.delete("/users/:id", userControllers.destroy);
router.put("/skills/:id", skillControllers.edit);
router.post("/skills", skillControllers.add);
router.delete("/skills/:id", skillControllers.destroy);

router.put("/projects/:id", projectControllers.edit);
router.post("/projects", projectControllers.add);
router.delete("/projects/:id", projectControllers.destroy);

module.exports = router;
