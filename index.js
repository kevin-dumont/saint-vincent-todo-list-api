const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const port = 5000;

app.use(bodyParser.json());

app.get("/", (req, res) => {
  return res.json({
    message: `Welcome to a todo list API. Check the documentation : https://documenter.getpostman.com/view/11722081/SzzhddjY?version=latest`,
  });
});

let id = 1;
let todos = [
  {
    id: id++,
    title: "Faire la vaisselle",
    done: false,
    creationDate: Date.now(),
  },
  {
    id: id++,
    title: "Faire la ménage",
    done: true,
    creationDate: Date.now(),
  },
];

/**
 * List
 */
app.get("/todos", (req, res) => {
  return res.status(200).json(todos);
});

/**
 * Create
 */
app.post("/todos", (req, res) => {
  const { title = "" } = req.body;

  if (!title || "" === title.trim()) {
    return res.status(400).json({ error: "The 'title' field is required" });
  }

  const newTask = {
    id: id++,
    title,
    done: false,
    creationDate: Date.now(),
  };

  todos = [...todos, newTask];

  return res.status(200).json(todos);
});

/**
 * Update
 */
app.put("/todos/:id", (req, res) => {
  const { id } = req.params;
  const { title = "", done } = req.body;

  const todoIndex = todos.findIndex((t) => t.id == id);

  if (todoIndex === -1) {
    return res
      .status(404)
      .json({ error: `The todo with the id ${id} does not exist` });
  }

  if (!title || "" === title.trim()) {
    return res.status(400).json({ error: "The 'title' field is required" });
  }

  if (typeof done !== "boolean") {
    return res
      .status(400)
      .json({ error: "The 'done' field must be a boolean" });
  }

  todos[todoIndex] = { ...todos[todoIndex], id, title, done };

  return res.status(200).json(todos);
});

/**
 * Remove
 */
app.delete("/todos/:id", (req, res) => {
  const { id } = req.params;

  const todoIndex = todos.findIndex((t) => t.id == id);

  if (todoIndex === -1) {
    return res
      .status(404)
      .json({ error: `The todo with the id ${id} does not exist` });
  }

  todos = todos.filter((t) => t.id != id);

  return res.status(200).json(todos);
});

app.listen(port, () => {
  console.log(`Server is booming on port 5000
Visit http://localhost:5000`);
});
