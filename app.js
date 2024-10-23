const express = require('express');
const mongoose = require('mongoose');
const { Blog, UserProfile, Comment } = require('./models/models');
const jwt = reqire('jsonwebtoken')

const app = express();
const PORT = process.env.PORT || 3000;

const mongodb = "mongodb://localhost:27017/blog";
mongoose.connect(mongodb)
    .then(() => console.log("😄😄 Connected to MongoDB"))
    .catch((err) => console.error(err));

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Import routes
const indexRoute = require('./routes/index');
const aboutRoute = require('./routes/about');
const projectsRoute = require('./routes/projects');

// Use routes
app.use('/', indexRoute);
app.use('/about', aboutRoute);
app.use('/projects', projectsRoute);

// Log request URLs
app.use((req, res, next) => {
    console.log('Request URL:', req.url);
    next();
});

// 404 page for unknown routes
app.use((req, res) => res.status(404).render('404'));

// 500 error handler
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).render('500');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
