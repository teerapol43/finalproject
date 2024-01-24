import axios from "axios";

export const list = async (authtoken) => {
    return await axios.get(process.env.REACT_APP_API + "/user", {
        headers: {
            authtoken,
        },
    });
};

export const removeUser = async (authtoken, id) => {
    try {
        return await axios.delete(process.env.REACT_APP_API + "/user/" + id, {
            headers: {
                authtoken
            }
        });
    } catch (error) {
        console.error("Error removing user:", error);
        throw error; // Rethrow the error to be caught by the calling code
    }
};

export const changeRole = async (authtoken, data) => {
    return await axios.post(process.env.REACT_APP_API + "/change-role", { data }, {
        headers: {
            authtoken,
        },
    });
};

export const userCart = async (authtoken, cart) => {
    return await axios.post(process.env.REACT_APP_API + "/user/cart", { cart }, {
        headers: {
            authtoken,
        },
    });
};

export const getUserCart = async (authtoken) => {
    return await axios.get(process.env.REACT_APP_API + "/user/cart", {
        headers: {
            authtoken,
        },
    });
};

export const emptyCart = async (authtoken) => {
    return await axios.delete(`${process.env.REACT_APP_API}/user/cart`, {
        headers: { authtoken },
    });
};

export const saveAddress = async (authtoken, address) => {
    return await axios.post(process.env.REACT_APP_API + "/user/address", { address }, {
        headers: {
            authtoken,
        },
    });
};

export const saveOrder = async (authtoken) => {
    return await axios.post(process.env.REACT_APP_API + "/user/order", {}, {
        headers: {
            authtoken,
        },
    });
};

export const getOrders = async (authtoken) => {
    return await axios.get(process.env.REACT_APP_API + "/user/orders", {
        headers: {
            authtoken,
        },
    });
};
export const getWishList = async (authtoken) => {
    return await axios.get(process.env.REACT_APP_API + "/user/wishlist", {
        headers: {
            authtoken,
        },
    });
};
export const addToWishList = async (authtoken, productId) => {
    try {
        return await axios.post(process.env.REACT_APP_API + "/user/wishlist", { productId }, {
            headers: {
                authtoken,
            },
        });
    } catch (error) {
        // Handle error (e.g., log it, show a user-friendly message)
        console.error('Error adding to wishlist:', error);
        throw error; // Rethrow the error for the caller to handle if needed
    }
};

export const removeWishList = async (authtoken, productId) => {
    return await axios.put(
        process.env.REACT_APP_API + "/user/wishlist/" + productId,
        {},  // Empty data object to satisfy the axios.put signature
        {
            headers: {
                authtoken,
            },
        }
    );
};
