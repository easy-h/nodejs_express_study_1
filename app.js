var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var mysql = require('mysql')
app.listen(3000, function() {
    console.log("start node.js server on port 3000 !")
});

//mysql 연결 
var connection = mysql.createConnection({
    host : 'localhost',
    port : 3306,
    user : 'easyh',
    database : 'study_js'
})
connection.connect();

//Controller 같은 역할
//static setting
app.use(express.static('public'))

//json 데이터를 받기 위한 post(클라이언트의 응답 json형태 및 Post 받기 설정)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine', 'ejs')

//url routing
app.get('/', function(req, res) {
    console.log("/(root)")
    //res.send("Hello world !")
    //해당 파일을 클라이언트에게 전달
    res.sendFile(__dirname + "/public/main.html")
})

app.get('/main', function(req, res) {
    console.log("/main")
    res.sendFile(__dirname + "/public/main.html")
})

app.post('/email_post', function(req, res) {
    console.log(req.body.email)
    //get -> req.param('email')
    //post -> body.parser(npm install body-parser --save)
    
    // response
    // res.send('<h1>Welcome '+ req.body.email + '</h1>');
    res.render('email.ejs', {'email' : req.body.email})
})

app.post('/ajax_send_email', function(req, res) {
    //sendAjax에 의한 호출
    console.log("ajax : " + req.body.email);
    var responseData = {'result' : 'OK', 'email' : req.body.email};
    res.json(responseData);
})



