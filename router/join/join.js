var express = require('express')
var app = express()
var router = express.Router()
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
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
    console.log("/join come")
    // res.sendFile(path.join(__dirname, '../../public/join.html'))
    res.render('join.ejs');
});

router.post('/', passport.authenticate('local-join', {
    successRedirect : '/main',
    failureRedirect : '/join',
    failureFlash : true
}))

passport.use('local-join', new LocalStrategy({
    userNameField:'email',
    passwordField:'password',
    passReqToCallback:true
    }, function(req, email, password, done) {
        console.log("local-join callback called");
        var query = connection.query('select * from user where email=?', [email], function(err, rows) {
            if(err) return done(err);

            if(rows.length) {
                console.log("existed user")
                return done(null, false, {message : 'your email is already used'})
            } else {

            }
        }) 
    }
));




// //db insert하기 (escape 문서 확인)
// router.post('/', function(req,res) {
//     var body = req.body;
//     var email = body.email;
//     var name = body.name;
//     var password = body.password;

//     //escape 사용
//     var sql = {email : email, name : name, pw : password}
//     var query = connection.query('insert into user set ?', sql, function (err, rows) {
//       if(err) throw err;
//       else res.render('welcome.ejs', {'name' : name, 'id' : rows.insertId})
//     })
// });

module.exports = router;