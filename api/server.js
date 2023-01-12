const express = require('express');
const router = require('./routes.js');
const app = express();


app.use(express.json())

app.use(require("./routes.js"))
app.listen(3333, () => {
    console.log('server at port 3333 is running');
});

router.get("/", (req, res) => {
    res.send('teste');
})



