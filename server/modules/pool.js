const { Pool } = require('pg')

// Replace the connection string with your PostgreSQL connection string
const pool = new Pool({
    host: 'localhost', // Server hosting the postgres database
    port: 5432, // env var: PGPORT
    database: 'todos',
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
})

pool.on('error', (err) => {
    console.log('Unexpected error on idle client', err)
    process.exit(-1)
})

module.exports = pool
