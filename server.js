const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app= express();

var port=process.port;
// Use partials
hbs.registerPartials(__dirname + '/views/partials');

// use helpers
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

// Set hbs scope.....
app.set('view engine','hbs')

//Use of static page in Node JS
app.use(express.static(__dirname + '/public'));

app.use((req,res,next) => {
  var now = new Date();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + `\n`,(err) => {
    if(err){
      console.log('Unable to append to server.log.');
    }
  });
  next();
});

// Maintenance Page
//app.use((req,res,next) => {
//  res.render('maintenance.hbs')
//});

app.get('/',(req,res) => {
  res.render('home.hbs',{
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to the page',
    currentYear: new Date().getFullYear()
  });
});

app.get('/about',(req,res) => {
  res.render('about.hbs',{
    pageTitle: 'About us',
    currentYear: new Date().getFullYear()
  });
});

app.get('/bad',(req,res) => {
  res.send({
    errorMessage: 'Unable to handle the request',
    status:[
      400,
      'Not OK'
    ]
  });
});

app.listen(port,() => console.log(`Server is running on port ${port}`));
