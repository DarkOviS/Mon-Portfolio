const express = require("express");

const router = express.Router();

const itemControllers = require("./controllers/itemControllers");

router.get("/users", itemControllers.browse);
router.get("/users/:id", itemControllers.read);
router.put("/users/:id", itemControllers.edit);
router.post("/users", itemControllers.add);
router.delete("/users/:id", itemControllers.destroy);

router.get("/skills", itemControllers.browse);
router.get("/skills/:id", itemControllers.read);
router.put("/skills/:id", itemControllers.edit);
router.post("/skills", itemControllers.add);
router.delete("/skills/:id", itemControllers.destroy);

module.exports = router;
