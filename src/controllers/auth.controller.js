import config from '../config/auth.config.js';
import db from '../models/index.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const User = db.user;

export const signup = (req, res) => {
    const user = new User({
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 10)
    });

    user.save((err, user) => {
        if (err) {
            res.starus(500).json({ message: err });
            return;
        }

        res.status(201).json({ message: 'User was registered!' });
    })
}


export const signin = (req, res) => {
    User.findOne({
        username: req.body.username
    })
    .exec((err, user) => {
        if (err) {
            res.status(500).json({ message: err });
            return
        }

        if(!user) {
            return res.status(404).json({ message : 'User not found' });
        }

        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

        if (!passwordIsValid) {
            return res.status(401).json({
                accessToken: null,
                message: 'Invalid password'
            });
        }

        const token = jwt.sign({ id: user.id }, config.secret, { expiresIn: 1800 }, (err, token) => {
            res.status(200).json({
                id: user._id,
                username: user.username,
                accessToken: token
            });
        });
    });
};