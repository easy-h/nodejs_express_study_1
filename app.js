var express = require('express')
var app = express()
var bodyParser = require('body-parser')

var main = require('./router/main')
var email = require('./router/email')

app.listen(3000, function() {
    console.log("start node.js server on port 3000 !")
});

//Controller 같은 역할
//static setting
app.use(express.static('public'))

//json 데이터를 받기 위한 post(클라이언트의 응답 json형태 및 Post 받기 설정)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine', 'ejs')
// /main으로 들어왔을때 인자를 사용
app.use('/main', main)
app.use('/email', email)

//url routing
app.get('/', function(req, res) {
    console.log("/(root)")
    //res.send("Hello world !")
    //해당 파일을 클라이언트에게 전달
    res.sendFile(__dirname + "/public/main.html")
})
