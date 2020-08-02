const express = require("express");
const pool = require("./db");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

app.get("/todolist", async (req, res) => {
    try {
        const allToDo = await pool.query(
            "SELECT * FROM todolist");
            res.json(allToDo.rows);
    } catch (error) {
        console.error(error.message);
    }
});

app.get("/todolist/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const allToDo = await pool.query(
            "SELECT * FROM todolist where id = $1", [ id ]);
            res.json(allToDo.rows);
    } catch (error) {
        console.error(error.message);
    }
});

app.post("/todolist", async (req, res) => {
    try {
        console.log(req.body);
        const { list } = req.body;
        console.log([list]);
        const newList = await pool.query(
            "INSERT INTO todolist (list) VALUES ($1) RETURNING *", [list]);
            res.json(newList.rows);
    } catch (error) {
        console.error(err.message);
    }
});

app.delete("/todolist/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const allToDo = await pool.query(
            "DELETE FROM todolist where id = $1 RETURNING *", [ id ]);
            res.json(allToDo.rows);
    } catch (error) {
        console.error(error.message);
    }
});

app.listen(2000, () => {
    console.log("Server started on port 2000")
})