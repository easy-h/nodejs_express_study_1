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
    console.log("/login get")
    // res.sendFile(path.join(__dirname, '../../public/join.html'))
    var msg;
    var errMsg = req.flash('error')
    if(errMsg) msg = errMsg;

    res.render('login.ejs', {'message' : msg});
})

passport.use('local-login', new LocalStrategy({
    usernameField:'email',
    passwordField:'password',
    passReqToCallback : true
}, function (req, email, password, done) {
    var query = connection.query('select * from USER where email=?', [email], function(err, rows) {
        if(err) return done(err);
        //로그인했을때 조회 정보 있는 경우 (로그인 가능)
        if(rows.length) {
            return done(null, {'email' : email, 'id' : rows[0].uid })
        } else {
            //오류나 값이 없을때 done에 false 후 메세지를 작성
            return done(null, false, {'message' : 'your Login email info is not found :)'})
        }
     })
   }
));

router.post('/', function(req, res, next) {
    passport.authenticate('local-login', function(err, user, info) {
        if(err) res.status(500).json(err);
        if(!user) return res.status(401).json(info.message);  

        req.logIn(user, function(err) {
            if(err) {return next(err);}
            return res.json(user);
        });
    })(req, res, next);
});


module.exports = router;