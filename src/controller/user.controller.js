import errorHandler from '../helpers/dbErrorHandler';
import User from '../models/user.model';
import extend from 'lodash/extend';
/**Create a new user */
export const create = async (req, res, next) => {
    const user = new User(req.body);
    user.save((err, result) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err)
            });
        }
        res.status(200).json({
            message: 'Successfully signed up'
        })
    })
};

/**Listing all user */

export const list = async (req, res) => {
    try {
        let users = await User.find().select('name email updatedAt createdAt')
        res.json(users)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

/**
 * @profile is appended data from user object
 * @next middleware propagate to next controller
 */
export const userById = async (req, res, next, id) => {
    try {
        let user = await User.findById(id);
        if (!user) {
            res.status(400).json({
                error: "User not found"
            })
        }
        req.profile = user;
        next();
    } catch (err) {
        return res.status(400).json({
            error: "Could not retrieve user \n" + err
        })
    }
}

/**Remove sensitive infor from profile object & response to client 
    @hashed_password
    @salt 
*/
export const read = (req, res) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile);
}


export const update = async (req, res, id) => {
    try {
        let user = req.profile;
        user = extend(user, req.body);
        await user.save();
        user.hashed_password = undefined;
        user.salt = undefined;
        res.json(user);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

export const remove = async (res, req, id) => {
    try {
        let user = req.profile;
        let deletedUser = await user.remove();
        deletedUser.hashed_password = undefined;
        deletedUser.salt = undefined;
        res.json(deletedUser);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

/**
 * Check User isSeller before creating new shop
 */

export const isSeller = (req, res, next) => {
    const isSeller = req.profile && req.profile.seller;
    if (!isSeller) {
        return res.status(403).json({
            error: "User is not seller"
        });
    }
    next();
}
