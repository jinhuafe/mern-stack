const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()

const PORT = 5000
const URI = "mongodb://127.0.0.1:27017/mern-todo"

app.use(express.json())
app.use(cors())

mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then((req, res) => {
        console.log("DataBase connected")
    })

// Schema
const TodoSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    done: {
        type: Boolean,
        default: false,
    }
})
// Model
const Todo = new mongoose.model('todo', TodoSchema)

// Routes
app.get('/api/todos', async (req, res) => {
    const todos = await Todo.find()
    res.json(todos)
})

app.post('/api/todo/add', async (req, res) => {
    const todo = new Todo({
        name: req.body.name
    })
    todo.save()
    res.json(todo)
})

app.delete('/api/todo/delete/:id', async (req, res) => {
    const todo = await Todo.findByIdAndDelete(req.params.id)
    res.json(todo)
})

app.get('/api/todo/done/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id)
    todo.done = !todo.done
    todo.save()
    res.json(todo)
})

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
})