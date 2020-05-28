const path = require('path');
const express = require('express');
const {accounts, users, writeJSON } = require('./data');

const app = express();
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

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

app.get('/transfer', function (req, res) {
  res.render('transfer');
});

app.post('/transfer', function (req, res) {
  accounts[req.body.from].balance = accounts[req.body.from].balance - parseInt(req.body.amount);
  accounts[req.body.to].balance = accounts[req.body.to].balance + parseInt(req.body.amount);
  writeJSON();
  res.render('transfer', {message: "Transfer Completed"})
});

app.get('/payment', function (req, res) {
  res.render('payment', {account: accounts.credit});
});

app.post('/payment', function (req, res) {
  accounts.credit.balance = accounts.credit.balance - req.body.amount;
  accounts.credit.available = accounts.credit.available + parseInt(req.body.amount);
  writeJSON();
  res.render('payment', { message: "Payment Successful", account: accounts.credit })
});


const server = app.listen(3000, function () {
  console.log(`app running on port ${server.address().port}`);
});