import axios from "axios";

export const list = async (authtoken) =>
    await axios.get(process.env.REACT_APP_API + "/user", {
        headers: {
            authtoken,
        },
    });

export const removeUser = async (authtoken, id) => {
    try {
        const response = await axios.delete(process.env.REACT_APP_API + "/user/" + id, {
            headers: {
                authtoken
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error removing user:", error);
        throw error; // Rethrow the error to be caught by the calling code
    }
}
export const changeRole = async (authtoken, data) =>
    await axios.post(process.env.REACT_APP_API + "/change-role", { data }, {
        headers: {
            authtoken,
        },
    });