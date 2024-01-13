const pool = require('../modules/pool');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const result = await pool.query('SELECT * FROM todos');
    res.json(result.rows);
});

router.post('/todos', async (req, res) => {
    const { text } = req.body;
    const result = await pool.query(
        'INSERT INTO todos (text) VALUES ($1) RETURNING *',
        [text]
    );
    res.json(result.rows[0]);
});

router.patch('/todos/:id', async (req, res) => {
    const { id } = req.params;
    const result = await pool.query(
        'UPDATE todos SET completed = NOT completed WHERE id = $1 RETURNING *',
        [id]
    );
    res.json(result.rows[0]);
});

router.put('/todos/:id', async (req, res) => {
    const id = req.params.id;
    const { text } = req.body;
    try {
      const result = await pool.query('UPDATE todos SET text = $1 WHERE id = $2 RETURNING *', [text, id]);
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error updating todo text', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });;

router.delete('/todos/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM todos WHERE id = $1', [id]);
    res.json({ message: 'Todo deleted successfully' });
});

module.exports = router;
