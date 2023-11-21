// server.js
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { Pool } = require('pg')

const app = express()
const port = process.env.PORT || 5002

app.use(bodyParser.json())
app.use(cors())

// Replace the connection string with your PostgreSQL connection string
const pool = new Pool({
    host: 'localhost', // Server hosting the postgres database
    port: 5432, // env var: PGPORT
    database: 'todos',
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
})

// Get all todos
app.get('/todos', async (req, res) => {
    const result = await pool.query('SELECT * FROM todos')
    res.json(result.rows)
})

// Add a new todo
app.post('/todos', async (req, res) => {
    const { text } = req.body
    const result = await pool.query(
        'INSERT INTO todos (text) VALUES ($1) RETURNING *',
        [text]
    )
    res.json(result.rows[0])
})

// Toggle a todo's completion status
app.patch('/todos/:id', async (req, res) => {
    const { id } = req.params
    const result = await pool.query(
        'UPDATE todos SET completed = NOT completed WHERE id = $1 RETURNING *',
        [id]
    )
    res.json(result.rows[0])
})

// Delete a todo
app.delete('/todos/:id', async (req, res) => {
    const { id } = req.params
    await pool.query('DELETE FROM todos WHERE id = $1', [id])
    res.json({ message: 'Todo deleted successfully' })
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
