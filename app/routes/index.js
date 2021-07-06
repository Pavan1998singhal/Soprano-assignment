const router = require('express').Router();
const {verifyToken} = require('../helperFunctions/auth');

const userRoutes = require('../routes/user.routes');
const postRoutes = require('../routes/post.routes');

router.use('/users', userRoutes);
router.use('/post', validateUser, postRoutes);

function validateUser(req, res, next){
    const authorization = req.headers['authorization'];

    verifyToken(authorization ? authorization.split(" ")[1] : '')
        .then(decoded => {
            req.userData = decoded;
            next();
        })
        .catch((err) => {
            res.status(401).json({
                status: false,
                message: err.message
            });
        });
};

module.exports = router;