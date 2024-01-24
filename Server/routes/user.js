const express = require("express");
const router = express.Router();

const {
    list,
    changeRole,
    removeUser,
    userCart,
    getUserCart,
    saveAddress,
    saveOrder,
    emptyCart,
    addToWishList,
    getWishList,
    removeWishList,
    getOrder } = require("../controllers/user");
const { auth, adminCheck } = require("../Middleware/auth");


// http://localhost:5000/api/user
router.get("/user", auth, adminCheck, list);
router.post("/change-role", auth, adminCheck, changeRole);
router.delete("/user/:id", auth, adminCheck, removeUser);
router.post("/user/cart", auth, userCart);
router.get("/user/cart", auth, getUserCart);
router.delete("/user/cart", auth, emptyCart);
router.post("/user/address", auth, saveAddress);
router.post("/user/order", auth, saveOrder);
router.get("/user/orders", auth, getOrder);
router.post("/user/wishlist", auth, addToWishList);
router.get("/user/wishlist", auth, getWishList);
router.put("/user/wishlist/:productId", auth, removeWishList);



module.exports = router;