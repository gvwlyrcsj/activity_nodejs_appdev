const express = require('express');
const app = express();
const port = 3000;

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Serve static files from the "public" directory
app.use(express.static('public'));

// Parse URL-encoded bodies (for POST requests)
app.use(express.urlencoded({ extended: true }));

// Routes

// GET request for the home page
app.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
});

// GET request for the "About" page
app.get('/about', (req, res) => {
    const username = req.query.username;
    res.render('about', { title: 'About Us', username });
});

// POST request to handle form submission
app.post('/submit', (req, res) => {
    const username = req.body.username;
    if (username) {
        // Redirect to the "About" page with username in query parameters
        res.redirect(`/about?username=${encodeURIComponent(username)}`);
    } else {
        res.send('Username not provided.');
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});