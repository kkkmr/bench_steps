const express = require('express');
const bodyParser = require('body-parser');
const client = require('./client');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// TODO to expose rest call
// which internally calls the gRPC server function using gRPC

app.get('/', (req, res)=>{
    client.getAll({}, (error, response) => {
        if (error) {
            res.status(500).json({ error: error.message });
        } else {
            res.send(response.customers);
        }    
    });
});

app.post('/create', (req, res)=>{
    let newCustomer = {
        name: req.body.name,
        age: req.body.age,
        address: req.body.address
    };
    client.insert(newCustomer, (error, response) => {
        if (error) {
            res.status(500).json({ error: error.message });
        } else {
            res.send({ response: response });
        }
    });
});

app.post('/update', (req, res)=>{ 
    let updatedCustomer = {
        id: req.body.id,
        name: req.body.name,
        age: req.body.age,
        address: req.body.address
    };
    client.update(updatedCustomer, (error, response) => {
        if (error) {
            res.status(500).json({ error: error.message });
        } else {
            res.send(response.customer);
        }
    });
});

app.post('/remove', (req, res)=>{ 
    let customerToDelete = {
        id: req.body.id
    };
    client.remove(customerToDelete, (error, response) => {
        if (error) {
            res.status(500).json({ error: error.message });
        } else {
            res.send(response.customer);
        }
    });
});

const PORT = 1003;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});