//Controller 같은 역할
var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var router = require('./router/index')
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var session = require('express-session')
var flash = require('connect-flash')

app.listen(3000, function() {
    console.log("start node.js server on port 3000 !")
});

app.use(session({
  //세션 암호화 키값
  secret : 'keyboard cat',
  //세션이 있는데 재요청시 true, false
  //default 요소로 2개는 반드시 명시
  resave : false,
  saveUninitialized : true
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
//static setting
app.use(express.static('public'))
//json 데이터를 받기 위한 post(클라이언트의 응답 json형태 및 Post 받기 설정)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine', 'ejs')

app.use(router)

