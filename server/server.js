// server.js
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 5002

app.use(bodyParser.json())
app.use(cors())

/** ---------- ROUTES ---------- **/
const todosRouter = require('./routes/todos.router.js');
app.use('/todos', todosRouter)


app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
