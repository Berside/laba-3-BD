const express = require('express');
const mysql2 = require('mysql2/promise');
const path = require('path');

const pool = mysql2.createPool({
    host: 'localhost',
    user: 'root',
    database: 'users',
    password: '',
});

const app = express();
app.use(express.static(path.join(__dirname)));

app.get('/users', function(req, res) {
    pool.query('SELECT * FROM user').then(function(data) {
        res.json(data);
    });
});

app.get('/authors', function(req, res) {
    pool.query('SELECT * FROM authors').then(function(data_authors) {
        res.json(data_authors);
    });
});

app.get('/purchase', function(req, res) {
    pool.query('SELECT * FROM purchase').then(function(data_purchase) {
        res.json(data_purchase);
    });
});

app.get('/main', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/index', function(req, res) {
    res.sendFile(path.join(__dirname, 'new.html'));
});

app.get('/employee', function(req, res) {
    pool.query('SELECT * FROM employee').then(function(data) {
        res.json(data);
    });
});
app.post('/employee', (req, res) => {
    res.json({ message: 'Success' });
});

app.get('/gift', function(req, res) {
    pool.query('SELECT * FROM gift').then(function(data) {
        res.json(data);
    });
});

app.get('/child', function(req, res) {
    pool.query('SELECT * FROM child').then(function(data) {
        res.json(data);
    });
});
app.listen(3000, function() {
    console.log('server started!');
});
