const express = require('express');
const mongoose = require('mongoose');
const Blog = require('./Models/models');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
const mongodb = "mongodb://localhost:27017/blog"; 
mongoose.connect(mongodb)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));

// Set up the view engine
app.set('view engine', 'ejs');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Log incoming request URLs
app.use((req, res, next) => {
    console.log('Request URL:', req.url);
    next();
});

// Render the home page with blog posts from MongoDB
app.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find(); // Fetch all blog posts
        res.render('index', { title: "Home", blogs });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error loading blog posts");
    }
});

// Handle form submissions to add a new blog post to MongoDB
app.post('/', async (req, res) => {
    const { title, content } = req.body;
    if (title && content) {
        try {
            const newBlog = new Blog({ title, content });
            await newBlog.save(); // Save new blog post to MongoDB
            console.log('New Blog:', { title, content });
            res.redirect('/'); // Redirect back to home after submission
        } catch (err) {
            console.error(err);
            res.status(500).send('Failed to save blog post');
        }
    } else {
        res.status(400).send('Title and content are required!');
    }
});


// Render other pages
app.get('/about', async (req, res) => {
    try {
        const blogs = new Blog({title, content});
        await blogs.find();
        res.render('about', {title:"About"});
    } catch (err) {
        console.error(err);
        res.status(500).send("Error loading blog posts");
}});
app.get('/projects', (req, res) => res.render('projects'));

// 404 page for unknown routes
app.use((req, res) => res.status(404).render('404'));

// 500 error page for server errors
app.use((err, req, res, next) => {
    res.status(500).render('500');
    next(err);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
