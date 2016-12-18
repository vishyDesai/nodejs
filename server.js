const express = require('express');
const hbs = require('hbs');
const fs= require('fs');

var app = express();
app.set('view engine', 'hbs');

hbs.registerPartials(__dirname + '/views/partials')
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
})

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now} : ${req.method} ${req.url}`

  console.log(log);
  fs.appendFile('server.log', log + '\n');
  next();
});

app.use((req, res, next) => {
  res.render('mainteneance.hbs',{
    message: 'Under Mainteneance'
  })
});
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
     //res.send('<h1>Hello Express!</h1>');
     //res.send({
    //   name: 'Vishal',
    //   likes: ['Biking','Coding']
     //})
     res.render('home.hbs',{
       pageTitle: 'My Website',
       pageHeader: 'Home Page',
       welcomeMessage: 'Welcome to MySite'

     })
});
app.get('/about', (req,res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',

  });
});
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to find Page'
  })
});
app.listen(3000, () => {
  console.log('Server is starting up');
});
