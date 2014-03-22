var fs = require('fs');

fs.readFile('www/assets/css/main.css','utf8', function (err, data) {
  if (err) throw err;

  pattern       = "/*!ABOVE_THE_FOLD */";
  css           = data.split(pattern);
  aboveTheFold  = '';
  bellowTheFold = data;

  for (var i =0; i < css.length -1; i++) {
    if(i%2 == 1){
      aboveTheFold += css[i];
      bellowTheFold = bellowTheFold.replace(css[i], '').split(pattern).join('');
    }
  }

  fs.readFile('www/index.html','utf8', function (err, data) {
    htmlContents = data.replace('<style></style>','<style>'+aboveTheFold+'</style>')

    fs.writeFile('www/index.html', htmlContents, function (err) {
      if (err) throw err;
      console.log('Above the fold');
    });
  });  

  fs.writeFile('www/assets/css/main.css', bellowTheFold, function (err) {
    if (err) throw err;
    console.log('Bellow the fold');
  });

});