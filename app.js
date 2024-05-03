const express = require('express')
const connection = require('./connection')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }));

//GET - all data & query param
app.get('/api/list', (req, res) => {
    var sql = "SELECT * FROM tasks"
    const priority = req.query.priority
    const status = req.query.status
    if (priority && status) {
        sql += " WHERE priority=? AND status=?"
        connection.query(sql, [priority, status], (err, rows) => {
            if (err) {
                res.json({ status: 'Error during getting data', error: err.message });
            } else {
                res.json(rows)
            }
        });
    } else if (status) {
        sql += " WHERE status=?"
        connection.query(sql, [status], (err, rows) => {
            if (err) {
                res.json({ status: 'Error during getting data', error: err.message })
            } else {
                res.json(rows)
            }
        });
    } else if(priority) {
        sql += " WHERE priority=?"
        connection.query(sql, [priority], (err, rows) => {
            if (err) {
                res.json({ status: 'Error during getting data', error: err.message });
            } else {
                res.json(rows)
            }
        })
    } else {
        connection.query(sql, (err, rows) => {
            if (err) {
                res.json({ status: 'Error during getting data', error: err.message });
            } else {
                res.json(rows);
            }
        });
    }
});

//GET - id
app.get('/api/list/:id', (req, res) => {
    const id = Number(req.params.id)
    connection.query("SELECT * FROM tasks WHERE id=?", [id], (err, rows) => {
        if (err) {
            res.json({ status: 'Error during getting data', error: err.message });
        } else {
            res.json(rows);
        }
    });
});

//Create new task
app.post('/api/list', (req, res) => {
    const body = req.body;
    const data = [body.title, body.description, body.priority, body.due_date, body.status]
    // console.log(data)
    connection.query("INSERT INTO tasks(title, description, priority, due_date, status) VALUES(?)", [data], (err, rows) => {
        if (err) {
            res.json({ status: 'Error during insert data', error: err.message });
        } else {
            res.json(rows)
        }
    })
})


/**
 * TODO
 * GET - query param
 * duedate, duedaterange
 * PATCH - title, description, priority, due_date, status
 */

app.listen(port, () => {
    console.log(`Server runing on port ${port}`)
});