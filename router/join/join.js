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

//db insert하기 (escape 문서 확인)
router.post('/', function(req,res) {
    var body = req.body;
    var email = body.email;
    var name = body.name;
    var password = body.password;

    console.log(email);
    var sql = connection.query('insert into user (email, name, pw) values ("' + email + '", "' + name + '", "' + password + '")', function (err, rows) {
      if(err) { throw err};
      console.log("success DB insert");
    })
});

module.exports = router;