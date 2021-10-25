/**Authentication & authorization for protected user API endpoints */

import User from '../models/user.model';
import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import config from '../configs/config';

const signin = async (req, res) => {
    try {
        let user = await User.findOne({
            email: req.body.email
        });
        //Validation
        if (!user) {
            return res.status(401).json({
                error: "User not found"
            });
        }
        if (!user.authenticate(req.body.password)) {
            return res.status(401).send({
                error: "Email or password dont match!"
            });
        }

        //Response token
        const token = jwt.sign({
            _id: user._id
        }, config.jwtSecret);

        //Storage into cookie
        res.cookie("genToken", token, {
            expire: new Date() + 9999
        });

        res.json({
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
            }
        })

    } catch (err) {
        return res.status(400).json({
            error: "could not sign in"
        })
    }
}

const signout = (req, res) => {
    res.clearCookie("genToken");
    return res.status(200).json({
        message: "signed out"
    });
}

//Check the requesting client is authenticated or authorized
// expressJWT check valid JWT when a protected route is accesed
const requiredSignin = expressJwt({
    secret: config.jwtSecret,
    userProperty: 'auth',
    algorithms: ['RS256']
});

/**
 * Authorizing signed in user
 * @param {*} req.auth  in @requireSingin after auth verification 
 * 
 */
const hasAuthorization = (req, res, next) => {
    const authorized = (
        req.profile
        && req.auth
        && req.profile.id === req.auth._id
    );
    if (!authorized) {
        return res.status(403).json({
            error: "User is not authorized"
        });
    }
    next();
}

export default {
    signin,
    signout,
    requiredSignin,
    hasAuthorization
}
