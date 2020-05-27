const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', function (req, res) {
  res.render('index', {title: 'Index'});
});

const server = app.listen(3000, function () {
  console.log(`app running on port ${server.address().port}`);
});