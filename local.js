/*
Node.js 를 이용하여 로컬파일에 있는 xml을 파싱해준다 !!
*/
var fs = require("fs");
var xml2js = require("xml2js"); // xml -> json으로 자동변환 

//모듈로부터 파서 객체 생성 
var parser = xml2js.Parser();

fs.readFile(__dirname+"/res/data.xml","utf8",function(error,data){
    //console.log(data);

    //파싱시작 
    parser.parseString(data, function(err,result){
        console.log("책의 총수는", result.catalog.book.length);
        for(var i=0; i<result.catalog.book.length; i++){
            var json=result.catalog.book[i];
            console.log(json.title);
        }
    });

});