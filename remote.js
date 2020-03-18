//웹서버가 되어야함 아니다 
//단지 로컬파일이 아니라 원격지의 url을 통해 xml을 접근하고자 하는 것뿐임 
var http = require("http");
var xml2js = require("xml2js");

var parser = xml2js.Parser(); //파서 생성 

//원격지 주소를 대입하여 데이터 가져오자 
http.get("http://localhost:9999/res/data.xml", function(data){
    data.on("data", function(result){
        console.log(result);
        //파싱 하자 
        parser.parseString(result, function(err,record){
            console.log(record);

            for(var i=0; i<record.catalog.book.length; i++){
                var json = record.catalog.book[i];
                console.log(json.title);
            }
        });
    });
});