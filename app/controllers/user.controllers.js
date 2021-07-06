const users = require('../models/user');
const auth = require('../helperFunctions/auth');
const upload = require('../helperFunctions/upload');

const registration = async (req, res) => {
    let password = req.body.password;
    let name = req.body.name;
    let email = req.body.email;
    const avatar = req.file.filename;
    
    if(auth.validateEmail(email)){
        users.findOne({email})
            .then((result) => {
                if(result){
                    res.json({
                        status: false,
                        message: 'user with this email already exists.'
                    });
                }else{
                    const encryptedPassword = auth.encryptPassword(password);
                    users.create({
                            name: name,
                            email: email,
                            password: encryptedPassword,
                            avatar: avatar,
                            token: ''
                        })
                        .then((result) => {
                            res.json({
                                status: true,
                                message: 'User Registration Successfully',
                                data: {
                                    name: name,
                                    email: email,
                                    avatar: avatar,
                                }
                            });
                        })
                        .catch((error) => {
                            res.status(500).json({
                                message: 'Something went wrong here...' + error.message,
                                status: false
                            });
                        });
                }
            })
            .catch((error) => {
                res.status(500).json({
                    message: 'Something went wrong...' + error.message,
                    status: false
                });
            });
    }else{
        res.json({
            status: false,
            message: 'user with this email not valid.'
        });
    }
};

const login = async(req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    users.findOne({email})
        .then((user) => {
            if(user){
                const isValidUser = auth.validatePassword(password, user.password);
                if(isValidUser){

                    // entered emailId and password is correct

                    // generate JWT Token.
                    let userPayload = {
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        issued_at: new Date().getTime()
                    };
                    let token = auth.generateToken(userPayload);
                    users.findByIdAndUpdate(
                            {_id: user._id},
                            {token}
                        )
                        .then((result) => {
                            const data = {
                                id: user._id,
                                name: user.name,
                                email: user.email,
                                token
                            }
                            res.json({
                                status: true,
                                message: 'login successfully',
                                data
                            });
                        })
                        .catch((error) => {
                            next(error);
                        })
                }else{
                    res.status(401).json({
                        message: 'Login failed due to incorrect password',
                        status: false,
                    });
                }
            }else{
                res.status(401).json({
                    message: 'Login Failed due to invalid emailId',
                    status: false,
                });
            }
        })
        .catch((error) => {
            res.status(500).json({
                message: 'something went wrong...' + error.message,
                status: false
            });
        });
};

const uploadFiles = (req, res, next) => {
    const uploadImg = upload.single('avatar');

    uploadImg(req, res, function (err, some) {
      if (err) {
        return res.status(400).json({
          status: false,
          message: 'Error is here ' + err.message,
        });
      } else {
        return next();
      }
    });
};

module.exports = {
    registration, 
    login,
    uploadFiles
};