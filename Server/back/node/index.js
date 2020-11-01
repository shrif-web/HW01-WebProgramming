
var express = require('express');
var crypto = require('crypto');
const bodyParser = require('body-parser')
var fs = require("fs")

const port = 3000
const filePath = "/home/AHReccese/db/repo.txt"

var app = express();
app.use(bodyParser.json())


var server = app.listen(port, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})

app.post('/sha', function (req, res) {
  
  console.log("/sha")
  bodyJson  = req.body
  num1 = bodyJson.Num1
  num2 = bodyJson.Num2

  if(num1 == undefined || num2 == undefined || typeof(num1) != "number" || typeof(num2) != "number"){
    res.status(400) // Bad request.
    res.json({Status:"failed",Result:""})
    return
  }

  sum = num1 + num2
  const hash = crypto.createHash('sha256').update(sum.toString(10)).digest('base64');
  res.status(200)
  res.json({Status:"succeed",Result:hash})

})

app.get('/write', function (req, res) {

  console.log("/write")
  if(req.query.line == undefined){ // Bad request.(there isn't a parameter of line in get request(url))
    res.status(400);
    return
  }

  var lineNum = parseInt(req.query.line,10);
  status = ""
  text = "some text"
  get_line(filePath, lineNum, function(err, line){
    if(err == 0){
      text = line
      status = "succeed"
    }else{
      text = "indexOutOfBound"
      status = "failed"
    }
  })
  res.status(200)
  res.json({ Status:status,Result: text })

})

function get_line(filename, line_no, callback) {
  var data = fs.readFileSync(filename, 'utf8');
  var lines = data.split("\n");

  if(+line_no > lines.length){
    callback(1,undefined)
    return
  }

  callback(0, lines[+line_no-1]);
}
