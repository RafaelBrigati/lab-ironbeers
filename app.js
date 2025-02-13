const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(__dirname + "/views/Partials")

app.use(express.static(path.join(__dirname, 'public'))); 

app.get('/beers',(req, res)=> {
  punkAPI
  .getBeers ()
  .then(beersFromApi => {
    res.render('beers', { beersFromApi }); 
  })
  .catch(err => {
    console.log(err);
  });
});



app.get('/random-beer', (req, res) => {
  punkAPI
    .getRandom()
    .then(randomBeer => {
      res.render('random-beer', { randomBeer });
    })
    .catch(err => {
      console.log(err);
    });
});


app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  res.render('beers');
});

app.get('/random-beer', (req, res) => {
  res.render('random-beer');
});


app.listen(3000, () => console.log('🏃‍ on port 3000'));


