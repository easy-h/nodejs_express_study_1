var express = require('express')
var router = express.Router()
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy

var mysql = require('mysql')
//mysql 연결 
var connection = mysql.createConnection({
    host : 'localhost',
    port : 3306,
    user : 'easyh',
    database : 'study_js'
})
connection.connect()

//passport에서 done에서 값이 있을때 처리하는 기능
passport.serializeUser(function(user, done) {
    console.log('passport session save : ', user.id);
    done(null, user.id);
})

passport.deserializeUser(function(id, done) {
    console.log('passport session save : ', id);
    done(null, id);
})

router.get('/', function(req,res) {
    console.log("/join get")
    // res.sendFile(path.join(__dirname, '../../public/join.html'))
    var msg;
    var errMsg = req.flash('error')
    if(errMsg) msg = errMsg;

    res.render('join.ejs', {'message' : msg});
})

router.post('/', passport.authenticate('local-join', {
    successRedirect : '/main', //인증성공시 이동하는화면주소
    failureRedirect : '/join',
    failureFlash : true })
)

passport.use('local-join', new LocalStrategy({
    usernameField:'email',
    passwordField:'password',
    passReqToCallback : true
}, function (req, email, password, done) {
    var query = connection.query('select * from USER where email=?', [email], function(err, rows) {
        if(err) return done(err);

        if(rows.length) {
            console.log("existed user");
            return done(null, false, {message : 'your email is already used'})
        } else {
            var sql = {email : email, pw:password};
            var query = connection.query('insert into USER set ?', sql, (err, rows)=>{
                if(err) throw err;
                return done(null, {'email' : email, 'id' : rows.insertId })
            })
        }
    })
   }
));

module.exports = router;