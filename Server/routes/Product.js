const express = require("express");
const router = express.Router();
const {
  read,
  list,
  create,
  update,
  remove,
} = require("../controllers/Product");

const { auth } = require('../Middleware/auth')
const { upload } = require('../Middleware/upload')
router.get("/product", upload, list);
router.get("/product/:id", upload, read);
router.post("/product", upload, create);
router.put("/product/:id", upload, update);
router.delete("/product/:id", remove);

module.exports = router;
