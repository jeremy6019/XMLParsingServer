/*
아이폰대신에 공공데이터포철로부터 데이터를 조회하여,
json형식으로 제공해주자 
공공데이터 포털과의 관계에서는 클라이언트이지만 아이폰과의 관계에서는 
서버이다!! 
*/
var express = require("express");
var request = require("request");
var xml2js = require("xml2js");
var parser = xml2js.Parser();

var app = express();

//클라이언트 GET방식 요청처리 
app.get("/mnt", function(request,response){
   console.log( request.query);
   
   requestData(request.query.name, response)
});
// 공공데이터 포탈에 접근하자 
function requestData(name, res){
    var url = 'http://openapi.forest.go.kr/openapi/service/trailInfoService/getforeststoryservice';
    var queryParams = '?' + encodeURIComponent('ServiceKey') + '=FoAhiua5x7ZX9fdxZ2pke4mKSEhY2EwHfz5cfJOwzdpXlZYGA9W7XrldXjuOZYQyU%2Fju%2B70sZqBKgi4gifU3Hg%3D%3D'; /* Service Key*/
    queryParams += '&' + encodeURIComponent('mntnNm') + '=' + encodeURIComponent(name); /* */
    queryParams += '&' + encodeURIComponent('mntnHght') + '=' + encodeURIComponent(''); /* */
    queryParams += '&' + encodeURIComponent('mntnAdd') + '=' + encodeURIComponent(''); /* */
    queryParams += '&' + encodeURIComponent('mntnInfoAraCd') + '=' + encodeURIComponent(''); /* */
    queryParams += '&' + encodeURIComponent('mntnInfoSsnCd') + '=' + encodeURIComponent(''); /* */
    queryParams += '&' + encodeURIComponent('mntnInfoThmCd') + '=' + encodeURIComponent(''); /* */

    request({
        url: url + queryParams,
        method: 'GET'
    }, function (error, response, body) {
            //console.log('Status', response.statusCode);
            //console.log('Headers', JSON.stringify(response.headers));
            //console.log('Reponse received', body);
            var sendData={
                list:[]
            }; //클라이언트에게 전달할 최종 데이터 

            parser.parseString(body, function(err, jsonData){
                //console.log(jsonData.response.body[0].items[0].item[0].mntninfopoflc);
                console.log(jsonData);
                
                for(var i=0; i<jsonData.response.body.length;i++){
                    for(var j=0; j<jsonData.response.body[i].items.length;j++){
                        for(var a=0; a<jsonData.response.body[i].items[j].item.length; a++){
                            var mountain = jsonData.response.body[i].items[j].item[a];
                            console.log(mountain.mntninfopoflc[0]);

                            sendData.list.push(mountain.mntninfopoflc[0]);
                            
                        }
                    }
                }
                //여기서 응답데이터 전송 
                console.log(sendData);
                res.end(JSON.stringify(sendData));
            })
    });
}
app.listen(7777,function(){
    console.log("The server is running at 7777 port...");
});