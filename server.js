var express = require('express');
var bodyParser = require('body-parser');
 var mysql      = require('mysql');
var app = express();
app.use(bodyParser());


var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'test'
});

connection.connect();

app.get('/', function(req, res){

  var html = '<form action="/" method="post">' +
               'Adınız:' +
               '<input type="text" name="ad" placeholder="adınız" />' +
               '<br>' +
               'mail:' +
               '<input type="text" name="mail" placeholder="mail" />' +
               '<br>' +
               '<button type="submit">Gönder</button>' +
            '</form>';

  res.send(html);
});


app.post('/', function(req, res){
  var ad = req.body.ad;
  var mail = req.body.mail;
  var html = 'Merhaba: ' + ad + '.<br>' +
             '<a href="/">Geri Dön</a>';
             var sql = "INSERT INTO uye (ad,mail) VALUES ?";
              var values = [
                [ad, mail]
              ];
              connection.query(sql, [values], function(err) {
                if (err) throw err;

              });


  res.send(html);
});

app.listen(8080);
