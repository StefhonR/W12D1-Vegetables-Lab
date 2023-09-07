const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const fruits = require('./models/fruits');

const jsxViewEngine = require('jsx-view-engine');

app.set('view engine', 'jsx');
app.set('views', './views');
app.engine('jsx', jsxViewEngine());

// Middleware;
app.use((req, res, next) => {
  console.log('Middleware: I run for all routes, 1');
  next();
});
// By implementing the line below, we now have access to the req.body. Which is the parsed formData from the form request.
app.use(express.urlencoded({ extended: false }));

// const middleware = (req, res, next) => {
//   console.log('Middleware: I run for all routes, 1');
//   next();
// };

// Index
app.get('/fruits', (req, res) => {
  console.log('Index controller');
  res.render('fruits/Index', { fruits });
});

// New
app.get('/fruits/new', (req, res) => {
  console.log('New controller');
  res.render('fruits/New');
});

// Delete

// Update

// Create
app.post('/fruits', (req, res) => {
  // if(req.body.readyToEat === 'on'){ //if checked, req.body.readyToEat is set to 'on'
  //   req.body.readyToEat = true; //do some data correction
  // } else { //if not checked, req.body.readyToEat is undefined
  //   req.body.readyToEat = false; //do some data correction
  // }
  req.body.readyToEat = req.body.readyToEat === 'on';

  fruits.push(req.body);
  console.log(fruits);

  res.redirect('/fruits'); // send the user back to /fruits
});

// Edit

// Show
app.get('/fruits/:id', (req, res) => {
  //second param of the render method must be an object
  res.render('fruits/Show', {
    //there will be a variable available inside the jsx file called fruit, its value is fruits[req.params.indexOfFruitsArray]
    fruit: fruits[req.params.id],
  });
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
