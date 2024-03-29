var fs = require('fs');
var completedTasks = 0;
var tasks = [];
var wordcount = {};
var filesDir = './text';

function checkIfComplete() {
  completedTasks++;
  if(completedTasks == tasks.length) {
    for(var index in wordcount) {
      console.log(index + ': ' + wordcount[index]);
    }
  }
}

function countWordsInText(text) {
  var words = text.toString().toLowerCase().split(/\W+/).sort();
  for(var index in words) {
    var word = words[index];
    if(word) {
      wordcount[word] = (wordcount[word]) ? wordcount[word] + 1 : 1;
    }
  }
}

fs.readdir(filesDir, function(err, files) {
  if(err) throw err;
  for(var index in files) {
    var task = (function(file) {
      return function() {
        fs.readFile(file, function(err, text) {
          if(err) throw err;
          countWordsInText(text);
          checkIfComplete();
        });
      }
    }) (filesDir + '/' + files[index]);
    tasks.push(task);
  }

  for(var task in tasks) {
    tasks[task]();
  }
});