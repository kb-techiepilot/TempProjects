const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "root123",
    database: "todolist",
    host: "localhost",
    port: "5432"
});

module.exports = pool;