import db from '../models/index.js';

const User = db.user;

export const checkDuplicateUsername = (req, res, next) => {
    User.findOne( { username: req.body.username })
        .exec((err, user) => {
            if (err) {
                res.status(500).json( { message: err });
                return;
            }
            if (user) {
                res.status(400).json({ message: 'Username is in use!' })
                return;
            }
            next();

        })
};
