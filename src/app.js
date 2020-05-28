const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const accountData = fs.readFileSync(path.join(__dirname, '/json/accounts.json'), {encoding: 'UTF8'});
const accounts = JSON.parse(accountData);
const userData = fs.readFileSync(path.join(__dirname, '/json/users.json'), {encoding: 'UTF8'});
const users = JSON.parse(userData);

app.get('/', function (req, res) {
  res.render('index', {title: 'Account Summary', accounts: accounts});
});

app.get('/savings', function (req, res) {
  res.render('account', {account: accounts.savings});
});

app.get('/checking', function (req, res) {
  res.render('account', {account: accounts.checking});
});

app.get('/credit', function (req, res) {
  res.render('account', {account: accounts.credit});
});

app.get('/profile', function (req, res) {
  res.render('profile', {user: users[0]});
});

const server = app.listen(3000, function () {
  console.log(`app running on port ${server.address().port}`);
});