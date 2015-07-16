var fs = require('fs');
var styleText = fs.readFileSync('style.css', {encoding: 'utf-8'});
styleText.split('\n').forEach(function(line) {
  console.log('\'' + line + '\',');
});
