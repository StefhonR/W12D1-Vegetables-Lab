require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const Fruit = require('./models/fruit');
const vegetables = require('./models/vegetables')
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once("open", () => {
  console.log("breached through their firewall, connected to the mongo server >:)")
})


console.log(process.env.ENVVAR)

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
app.get('/fruits', async (req, res) => {
  try {
    const foundFruits = await Fruit.find({})
    console.log(foundFruits)
    res.status(200).render('fruits/Index', {
      fruits: foundFruits
    })
  } catch (err) {
    res.status(400).send(err)
  }
});

// New
app.get('/fruits/new', (req, res) => {
  console.log('New controller');
  res.render('fruits/New');
});

// Delete

// Update

// Create
app.post('/fruits', async (req, res) => {
  try {
    // if(req.body.readyToEat === 'on'){ //if checked, req.body.readyToEat is set to 'on'
    //   req.body.readyToEat = true; //do some data correction
    // } else { //if not checked, req.body.readyToEat is undefined
    //   req.body.readyToEat = false; //do some data correction
    // }
    req.body.readyToEat = req.body.readyToEat === 'on';

    const createdFruit = await Fruit.create(req.body)

    res.status(201).redirect('/fruits')
  } catch (err) {
    res.status(400).send(err)
  }

  
});

// Edit

// Show
app.get('/fruits/:id', async (req, res) => {
  try {
    const foundFruit = await Fruit.findById(req.params.id)
    //second param of the render method must be an object
    res.render('fruits/Show', {
      //there will be a variable available inside the jsx file called fruit, its value is fruits[req.params.indexOfFruitsArray]
      fruit: foundFruit,
    });
  } catch (err) {
    res.status(400).send(err)
  }
  
});

app.get('/vegetables', (req, res) => {
  console.log('Index controller');
  res.render('vegetables/Index', { vegetables });
});

app.get('/vegetables/new', (req, res) => {
  console.log('New controller');
  res.render('vegetables/New');
});

app.post('/vegetables', (req, res) => {
  req.body.readyToEat = req.body.readyToEat === 'on';

  vegetables.push(req.body);
  console.log(vegetables);

  res.redirect('/vegetables');
});

app.get('/vegetables/:id', (req, res) => {
  res.render('vegetables/Show', {
  vegetable: vegetables[req.params.id],
  });
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
