//router
var express = require('express')
var app = express()
var router = express.Router()
var main = require('./main/main')
var email = require('./email/email')
var join = require('./join/join')
var login = require('./login/login')

//상대경로
var path = require('path')

router.get('/', function(req, res) {
    console.log("/index.js path loaded")
    res.sendFile(path.join(__dirname, "../public/main.html"))
});

router.use('/main', main)
router.use('/email', email)
router.use('/join', join)
router.use('/login', login)

module.exports = router;