var express = require('express')
var app = express()
var router = express.Router()
//상대경로
var path = require('path')

//DB setting
var mysql = require('mysql')
//mysql 연결 
var connection = mysql.createConnection({
    host : 'localhost',
    port : 3306,
    user : 'easyh',
    database : 'study_js'
})
connection.connect();

router.get('/', function(req,res) {
    console.log("/join come;")
    res.sendFile(path.join(__dirname, '../../public/join.html'))
});

module.exports = router;