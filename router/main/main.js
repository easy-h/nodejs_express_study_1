//router 나누기
var express = require('express')
var app = express()
var router = express.Router()
//상대경로
var path = require('path')

router.get('/', function(req, res) {
    //로그인 인증이 성공했을 때
    console.log("main.js -> ", req.user)
    var id = req.user;

    res.render('main.ejs', {'id': id})
    // res.sendFile(path.join(__dirname, "../public/main.html"))
});

//외부 라이브러리를 module로 가져올 수 있다.
// router exports 설정
module.exports = router;