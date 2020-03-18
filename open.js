var request = require('request');
var xml2js = require("xml2js");
var parser = xml2js.Parser();//파서 생성 


var url = 'http://openapi.forest.go.kr/openapi/service/trailInfoService/getforeststoryservice';
var queryParams = '?' + encodeURIComponent('ServiceKey') + '=FoAhiua5x7ZX9fdxZ2pke4mKSEhY2EwHfz5cfJOwzdpXlZYGA9W7XrldXjuOZYQyU%2Fju%2B70sZqBKgi4gifU3Hg%3D%3D'; /* Service Key*/
queryParams += '&' + encodeURIComponent('mntnNm') + '=' + encodeURIComponent('속리산'); /* */
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

        parser.parseString(body, function(err, jsonData){
            console.log(jsonData.response.body[0].items[0].item[0].mntninfopoflc);
        })
});