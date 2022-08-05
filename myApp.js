let express = require('express');
let app = express();
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next()
})
app.enable('trust proxy')
require('dotenv').config()
console.log(process.env.MESSAGE_STYLE)

app.get('/', (req,res) => {
    res.sendFile(__dirname + "/views/index.html")
})

app.use('/public', express.static(__dirname + "/public"))

app.get('/json', (req,res) => {
    let messageStyle = process.env.MESSAGE_STYLE;
    let message = "Hello json";
    if (messageStyle === "uppercase") {
        message = message.toUpperCase()
    }
    res.json({"message": message})
})

app.get('/now', (req, res, next) => {
    req.time = new Date().toString()
    next();
}, (req, res) => {
    res.json({time: req.time})
})


































 module.exports = app;
