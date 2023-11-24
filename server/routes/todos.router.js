const pool = require('../modules/pool')
const express = require('express')
const router = express.Router()

// Get all todos
router.get('/todos', async (req, res) => {
    const result = await pool.query('SELECT * FROM todos')
    res.json(result.rows)
})

// Add a new todo
router.post('/todos', async (req, res) => {
    const { text } = req.body
    const result = await pool.query(
        'INSERT INTO todos (text) VALUES ($1) RETURNING *',
        [text]
    )
    res.json(result.rows[0])
})

// Toggle a todo's completion status
router.patch('/todos/:id', async (req, res) => {
    const { id } = req.params
    const result = await pool.query(
        'UPDATE todos SET completed = NOT completed WHERE id = $1 RETURNING *',
        [id]
    )
    res.json(result.rows[0])
})

// Delete a todo
router.delete('/todos/:id', async (req, res) => {
    const { id } = req.params
    await pool.query('DELETE FROM todos WHERE id = $1', [id])
    res.json({ message: 'Todo deleted successfully' })
})

module.exports = router
