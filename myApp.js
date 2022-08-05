let express = require('express');
let app = express();
app.enable('trust proxy')
let bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: false}))

app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next()
})

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

app.get('/:word/echo', (req, res) => {
    res.json({echo: req.params.word})
})

app
    .route('/name')
    .get((req,res) => {
        let firstName = req.query.first
        let lastName = req.query.last
        res.json({name: `${firstName} ${lastName}`})
    })
    .post((req, res) =>{
        let firstName = req.body.first
        let lastName = req.body.last
        res.json({name: `${firstName} ${lastName}`})
    })

































 module.exports = app;
