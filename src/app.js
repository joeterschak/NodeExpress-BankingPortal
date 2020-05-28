const path = require('path');
const express = require('express');
const { accounts, users } = require('./data');
const accountRoutes = require('./routes/accounts');
const servicesRoutes = require('./routes/services');

const app = express();
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/account', accountRoutes);
app.use('/services', servicesRoutes);

app.get('/', function (req, res) {
  res.render('index', {title: 'Account Summary', accounts: accounts});
});

app.get('/profile', function (req, res) {
  res.render('profile', {user: users[0]});
});

const server = app.listen(3000, function () {
  console.log(`app running on port ${server.address().port}`);
});