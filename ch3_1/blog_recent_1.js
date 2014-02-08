var http = require('http');
var fs = require('fs');

function formatHTML(titles, tmp1, res) {
  var html = tmp1.replace('%', titles.join('<li></li>'));
  res.writeHead(200, {'Content-Type' : 'text/html'});
  res.end(html);
}
function hadError(err, res) {
  console.error(err);
  res.end('Server Error');
}
function getTemplates(titles, res) {
  fs.readFile('./template.html', function(err, data) {
    if(err) {
      hadError(err, res);
    } else {
      formatHTML(titles, data.toString(), res);
    }
  });
}
function getTitles(res) {
  fs.readFile('./titles.json', function(err, data) {
    if(err) {
      hadError(err, res);
    } else {
      var titles = JSON.parse(data.toString());
      getTemplates(titles, res);
    }
  });
}

var server = http.createServer(function(req, res) {
  getTitles(res);
}).listen(8000, "127.0.0.1");
