import jwt from 'jsonwebtoken';
import config from '../config/auth.config.js';
import db from '../models/index.js';

const User = db.user;

export const verifyToken = (req, res, next) => {
    let token = req.body.headers['x-access-token'];

    if (!token) {
        return res.status(403).json({ message: 'No token provided!' });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if(err) {
            return res.status(403).json({ message: 'Unautharised!' });
        }
        req.userId = decoded.id;
        next();
    })
}
