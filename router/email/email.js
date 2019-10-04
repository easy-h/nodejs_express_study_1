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


// router
// email/form 
router.post('/form', function(req, res) {
    console.log(req.body.email)
    //get -> req.param('email')
    //post -> body.parser(npm install body-parser --save)
    
    // response
    // res.send('<h1>Welcome '+ req.body.email + '</h1>');
    res.render('email.ejs', {'email' : req.body.email})
})

// email/ajax
router.post('/ajax', function(req, res) {
    //sendAjax에 의한 호출
    console.log("ajax : " + req.body.email);
    // var responseData = {'result' : 'OK', 'email' : req.body.email};
    
    //check Validate 
    var email = req.body.email;
    var responseData = {};

    var query = connection.query("select * from USER where email='"+email+"'", function(err, rows) {
        if(err) throw err;
        if(rows[0]) {
            console.log(rows[0]);
            responseData.result = "ok";
            responseData.name = rows[0].name;
        } else {
            responseData.result = "none";
            responseData.name = "";
        }
        res.json(responseData);
    })
})

module.exports = router;