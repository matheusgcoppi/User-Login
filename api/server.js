const express = require('express');

const app = express();

app.use(express.json())


app.listen(3333, () => {
    console.log('server at port 3333 is running');
});

app.get('/', (req, res) =>{
    res.send("TESTE")
})