const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    description: {
        type: String, 
        required: false
    },
    images: [String],
    created_by:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    created_at:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('post', postSchema);