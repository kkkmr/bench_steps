import express from 'express';
// body-parser is a middleware to parse incoming request bodies in a middleware before your handlers, available under the req.body property.
import bodyParser from 'body-parser';

const app = express(); 
app.use(bodyParser.json());

const PORT = 2527;

app.all('/', (req, res)=>{
    res.send('Hello World!');
})

const todos = [{
    id:'1',
    title:'Learn NodeJS',
    completed: false
},{
    id:'2',
    title:'Learn ExpressJS',
    completed: false
}, {
    id:'3',
    title:'Learn MongoDB',
    completed: false
},
{
    id:'4',
    title:'Learn ReactJS',
    completed: false
}, {
    id:'5',
    title:'Learn Angular',
    completed: false
}]

// READ
app.get('/todos', (req, res)=>{
    res.json(todos);
})

// CREATE
app.post('/todos', (req, res)=>{
    const newTodo = req.body;
    todos.push(newTodo);
    res.status(201).json({
        message: 'Todo created successfully',
        todo: newTodo
    });
});

app.put('/todos/:id', (req, res)=>{
    const id = req.params.id;
    const updatedTodo = req.body;
    const index = todos.findIndex(todo => todo.id === id);

    if (index !== -1) {
        todos[index] = { ...todos[index], ...updatedTodo };
        res.json({
            message: 'Todo updated successfully',
            todo: todos[index]
        });
    } else {
        res.status(404).json({
            message: 'Todo not found'
        });
    }
});

app.delete('/todos/:id', (req, res)=>{
    const id = req.params.id;
    const index = todos.findIndex(todo => todo.id === id);

    if (index !== -1) {
        todos.splice(index, 1);
        res.json({
            message: 'Todo deleted successfully'
        });
    } else {
        res.status(404).json({
            message: 'Todo not found'
        });
    }
});

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})