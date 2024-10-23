const express = require('express');
const router = express.Router();
const { Blog, UserProfile } = require('../models/models');

router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.render('index', { title: "Home", blogs });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error loading blog posts");
    }
});

router.get('/login', (req, res) => {
    res.render('login', { title: "UserLogin" });
});

router.post('/login', async (req, res) => {
    const { userName, userPass } = req.body;
    if (userName && userPass) {
        try {
            let user = await UserProfile.findOne({ userName });
            if (!user) {
                user = new UserProfile({ userName, userPass });
                await user.save();
            }
            res.redirect('/');
        } catch (err) {
            console.error(err);
            res.status(500).send("Error handling login");
        }
    } else {
        res.status(400).send("Username and password are required!");
    }
});

router.post('/login', async (req, res) => {
    const username = req.body.userName;
    const user = {
        user:username
    }

    JsonWebTokenError.sign(user, process.env.ACCESS_TOKEN, res.json.ACCESS_TOKEN{
        
    })

})

router.post('/new-blog', async (req, res) => {
    const { title, content } = req.body;
    if (title && content) {
        try {
            const newBlog = new Blog({ title, content });
            await newBlog.save();
            res.redirect('/');
        } catch (err) {
            console.error(err);
            res.status(500).send("Failed to save blog post");
        }
    } else {
        res.status(400).send("Title and content are required!");
    }
});

module.exports = router;
