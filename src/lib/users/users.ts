import express = require('express');

let app = module.exports = express();
let db = require('../../api/database.ts');


let cors = require('cors');
app.use(cors());

/**
 * GET request for users table
 */
app.get('/api/users/', (req, res) => {
    console.log('get users...');
    let sql = 'select * from users';
    let params = [];
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({error: err.message});
        } else {
            res.json({
                message: 'success',
                data: rows
            });
        }
    });
});

/**
 * Post request to login a user
 */
app.post('/api/user/login/', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let sql = 'select * from users where username = ?';
    let params = [username];
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({error: err.message});
        } else {
            let pass = rows[0].password;
            if (pass === password) {
                res.json({
                    message: 'success'
                });
            } else {
                res.json({
                    message: 'failure',
                });
            }
        }
    });
});
