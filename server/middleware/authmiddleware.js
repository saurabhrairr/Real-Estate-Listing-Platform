
const jwt = require('jsonwebtoken');
const User = require('../model/userschema');

module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'Authentication failed' });
        }
        const decodedToken = jwt.verify(token, process.env.Secure_Key);
        const user = await User.findById(decodedToken.userId);
        if (!user) {
            return res.status(401).json({ error: 'Authentication failed' });
        }
        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Authentication failed' });
    }
};
