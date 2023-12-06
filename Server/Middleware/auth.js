const jwt = require('jsonwebtoken');
exports.auth = async (req, res, next) => {
    try {
        const token = req.headers["authtoken"]
        if (!token) {
            return res.status(401).send('No token')
        }
        const decoded = jwt.verify(token, 'jwtsecret')
        console.log(decoded)
        next();
    } catch (error) {
        console.log(error)
        res.send('token Invalid').status(500)
    }
}