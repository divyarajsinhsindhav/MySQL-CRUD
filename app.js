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
        connection.query(sql, [priority, status], (err, result) => {
            if (err) {
                return res.json({ status: 'Error during getting data', error: err.message });
            } 
            if (!result || result.length === 0) {
                res.status(404).json({ status: 'Task not found' });
            } else {
                res.status(200).json(result);
            }
        });
    } else if (status) {
        sql += " WHERE status=?"
        connection.query(sql, [status], (err, result) => {
            if (err) {
                res.json({ status: 'Error during getting data', error: err.message })
            }
            if (!result || result.length === 0) {
                res.status(404).json({ status: 'Task not found' });
            } else {
                res.status(200).json(result);
            }
        });
    } else if(priority) {
        sql += " WHERE priority=?"
        connection.query(sql, [priority], (err, result) => {
            if (err) {
                return res.json({ status: 'Error during getting data', error: err.message });
            } 
            if (!result || result.length === 0) {
                res.status(404).json({ status: 'Task not found' });
            } else {
                res.status(200).json(result);
            }
        })
    } else {
        connection.query(sql, (err, result) => {
            if (err) {
                res.json({ status: 'Error during getting data', error: err.message });
            } 
            if (!result || result.length === 0) {
                res.status(404).json({ status: 'Task not found' });
            } else {
                res.status(200).json(result);
            }
        });
    }
});

//GET - id
app.get('/api/list/:id', (req, res) => {
    const id = Number(req.params.id)
    connection.query("SELECT * FROM tasks WHERE id=?", [id], (err, result) => {
        if (err) {
            res.json({ status: 'Error during getting data', error: err.message });
        } 
        if (!result || result.length === 0) {
            res.status(404).json({ status: 'Task not found', id });
        } else {
            res.status(200).json(result);
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
            console.log(data)
            res.status(200).json({ status: "Task Created successfully" , Data: data });
        }
    });
});

app.put('/api/list/:id', (req, res) => {
    const id = req.params.id;
    const data = req.body;
    connection.query("UPDATE tasks SET title=?, description=?, priority=?, due_date=?, status=? WHERE id=?", [data.title, data.description, data.priority, data.due_date, data.status, id], (err, result) => {
        if (err) {
            res.json({ status: 'Error during update data', error: err.message });
        } 
        if (result.affectedRows === 0) {
            res.status(404).json({ status: 'Task not found', id });
        } else {
            res.status(200).json({ status: "Task updated successfully", id: id, UpdatedData: data });
        }
    });
});

app.delete('/api/list/:id', (req, res) => {
    const id = req.params.id;
    connection.query("DELETE FROM tasks WHERE id=?", [id], (err, result) => {
        if (err) {
            res.status(500).json({ status: 'Error during delete data', error: err.message });
        } else {
            if (result.affectedRows === 0) {
                res.status(404).json({ status: 'Task not found', id });
            } else {
                res.status(200).json({ status: 'Task deleted successfully', id });
            }
        }
    });
});


/**
 * TODO
 * GET - query param
 * duedate, duedaterange
 */

app.listen(port, () => {
    console.log(`Server runing on port ${port}`)
});