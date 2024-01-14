const express = require("express");
const router = express.Router();

const { list, changeRole } = require("../controllers/user");
const { auth, adminCheck } = require("../Middleware/auth");

// http://localhost:5000/api/user
router.get("/user", auth, adminCheck, list);
router.post("/change-role", auth, adminCheck, changeRole);


module.exports = router;