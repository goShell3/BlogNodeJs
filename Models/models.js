const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Blog Schema
const blogSchema = new Schema({
    title: {
        type: String,
        required: true,
        minlength: 5,
    },
    content: {
        type: String,
        required: true,
        minlength: 10,
    }
}, { timestamps: true });

// User Profile Schema with unique userName
const userProfileSchema = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
    },
    userPass: {
        type: String,
        required: true,
        minlength: 6,
    }
}, { timestamps: true });

// Comment Schema with references to blog and user
const commentSchema = new Schema({
    comment: {
        type: String,
        required: true,
        minlength: 2,
    },
    blogID: {
        type: Schema.Types.ObjectId,
        ref: 'Blog',
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'UserProfile',
        required: true,
    }
}, { timestamps: true });

// Middleware to check references before saving
commentSchema.pre('save', async function (next) {
    try {
        const blogExists = await mongoose.model('Blog').exists({ _id: this.blogID });
        const userExists = await mongoose.model('UserProfile').exists({ _id: this.userId });

        if (!blogExists) {
            throw new Error('Blog does not exist for the provided blogID.');
        }
        if (!userExists) {
            throw new Error('User does not exist for the provided userId.');
        }
        next();
    } catch (error) {
        next(error);
    }
});

// Model Exports
const Blog = mongoose.model('Blog', blogSchema);
const UserProfile = mongoose.model('UserProfile', userProfileSchema);
const Comment = mongoose.model('Comment', commentSchema);

module.exports = { Blog, UserProfile, Comment };
