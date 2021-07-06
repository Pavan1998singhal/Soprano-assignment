const post = require('../models/post');
const upload = require('../helperFunctions/upload');

const createPost = (req, res) => {
    let title = req.body.title;
    let description = req.body.description;
    let userId = req.userData._id;

    const images = req.files.map(file => file.filename);

    const postData = {
        title: title,
        description: description,
        images,
        created_by: userId,
        created_at: new Date()
    };

    post.create(postData, (err, result) => {
            if(err){
                res.status(400).json({
                    status: false,
                    message: 'Failed to create the post'
                });
            }else{
                res.status(200).json({
                    status: true,
                    message: 'Post Created Successfully',
                    data: result
                });
            };
        });
};

const getAllPosts = (req, res) => {
    const skip = parseInt(req.query.skip) || 0;
    const limit = parseInt(req.query.limit) || 20;

    post.find()
        .skip(skip)
        .limit(limit)
        .sort({created_at: -1})
        .then((result) => {
            res.status(200).json({
                status: true,
                message: 'Records fetched successfully',
                data: result
            });
        })
        .catch((err) => {
            res.status(500).json({
                status: false,
                message: 'something went wrong...' + err.message
            });
        });
};

const getPostById = (req, res) => {
    let id = req.params.id;

    post.findById({_id: id})
        .sort({created_at: -1})
        .then((result) => {
            res.status(200).json({
                status: true,
                message: "successfully fetched!!",
                data: result
            })
        })
        .catch((err) => {
            res.status(500).json({
                status: false,
                message: 'something went wrong...' + err.message
            });
        });
};

const updatePost = (req, res) => {
    const id = req.params.id;
    const userId = req.userData._id;
    const images = req.files.map(file => file.filename);

    let postData = {
        title: req.body.title,
        description: req.body.description
    };

    if(images.length)
        postData.images = images;

    post.findOneAndUpdate(
            { _id: id, created_by: userId },
            postData,
            { new: true }
        )
        .then((result) => {
            res.status(200).json({
                status: true,
                message: 'successfully updated',
                data: result
            });
        })
        .catch((err) => {
            res.status(500).json({
                status: false,
                message: 'something went wrong...' + err.message
            });
        });
};

const deletePost = (req, res) => {
    const id = req.params.id;
    const userId = req.userData._id;
  
    post.findOneAndRemove({ _id: id, created_by: userId })
        .then((result) => {
            res.status(200).json({
            status: true,
            message: 'Successfully Deleted',
            data: result,
            });
        })
        .catch((err) => {
            res.status(500).json({
            status: false,
            message: 'Something went to Wrong',
            });
        });
  };

const uploadFiles = (req, res, next) => {
    const uploadImg = upload.array('images', 3);
    
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
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
    uploadFiles
};