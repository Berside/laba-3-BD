const express = require('express');
const mysql2 = require('mysql2/promise');
const path = require('path');
const bodyParser = require('body-parser');
const pool = mysql2.createPool({
    host: 'localhost',
    user: 'root',
    database: 'users',
    password: '',
});

const app = express();
app.use(express.static(path.join(__dirname)));
app.use(bodyParser.json());


app.get('/users', function(req, res) {
    pool.query('SELECT * FROM user').then(function(data) {
        res.json(data);
        console.log(data);
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

app.get('/log', function(req, res) {
    res.sendFile(path.join(__dirname, 'main.html'));
});

app.get('/index', function(req, res) {
    res.sendFile(path.join(__dirname, 'new.html'));
});

app.get('/employee', function(req, res) {
    pool.query('SELECT * FROM employee').then(function(data) {
        res.json(data);
    });
});


app.post('/employee', async (req, res) => {
    const {Employee, lastname_Employee, name_Employee, middlename_Employee, post_Employee, division_Employee, date_of_admission } = req.body;

    try {
        const [result] = await pool.query(
            `INSERT INTO employee (Employee, lastname_Employee, name_Employee, middlename_Employee, post_Employee, division_Employee, date_of_admission) VALUES (?,?,?,?,?,?,?)`,
            [Employee, lastname_Employee, name_Employee, middlename_Employee, post_Employee, division_Employee, date_of_admission]
        );
        console.log(result);
        res.send('Employee added successfully.');
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred while adding the employee.');
    }
});

app.delete('/employee/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await pool.query(
            `DELETE FROM employee WHERE Employee =?`,
            [id]
        );
        console.log(result);
        res.send('Employee deleted successfully.');
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred while deleting the employee.');
    }
});

app.listen(3000, function() {
    console.log('server started!');
});
