//Controller 같은 역할
var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var router = require('./router/index')

app.listen(3000, function() {
    console.log("start node.js server on port 3000 !")
});

//static setting
app.use(express.static('public'))
//json 데이터를 받기 위한 post(클라이언트의 응답 json형태 및 Post 받기 설정)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine', 'ejs')

app.use(router)

