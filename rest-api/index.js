import express from 'express';

const app = express();

const PORT = 2527;

app.all('/', (req, res)=>{
    console.log(req);
    console.log(res);
    res.send('Hello World!');
})

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})