/*
URL로 접근하는 클라이언트에게 xml데이터 제공하는 서버 
*/
var express = require("express");
var app = express(); 

//html,css,js,xml등등의 파일은 정적자원이므로, 굳이 이파일들에
//대한 요청에 대해서까지 요청처리하지 말고, 그냥 미들웨어로 처리 
app.use(express.static(__dirname));

app.listen(9999, function(){
    console.log("The server is running at 9999 port...");
});