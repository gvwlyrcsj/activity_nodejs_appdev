const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
});

app.get('/about', (req, res) => {
    const username = req.query.username;
    res.render('about', { title: 'About Us', username });
});

app.post('/submit', (req, res) => {
    const username = req.body.username;
    if (username) {
        res.redirect(`/about?username=${encodeURIComponent(username)}`);
    } else {
        res.send('Username not provided.');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
