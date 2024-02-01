const express = require('express');
let morgan = require('morgan')
const mongoose = require('mongoose');
const Blog = require('./models/Blog');

const app = express();

//db url
let mongoUrl = "mongodb+srv://root:rootroot@cluster0.hfbhvae.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(mongoUrl).then(() => {
  console.log('connected to db')
  app.listen(3000, () => {
    console.log('app is running on port 3000');
  })
}).catch(e => {
  console.log(e)
})

app.set('views', './views')
app.set('view engine', 'ejs')

app.use(morgan('dev'))
app.use(express.static('public'))

app.get('/add-blog', async (req, res) => {
  let blog = new Blog({
    title: "blog title 2",
    intro: "blog intro 2",
    body: "blog body 2"
  });

  await blog.save();
  res.send('blog saved');
})

app.get('/', (req, res) => {

  let blogs = [
    { title: 'Blog title 2', intro: 'this is blog intro 2' },
    { title: 'Blog title 3', intro: 'this is blog intro 3' },
  ];

  res.render('home', {
    blogs,
    title: "Home"
  })
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: "About"
  });
});

app.get('/contact', (req, res) => {
  res.render('contact', {
    title: 'Contact'
  });
});

app.use((req, res) => {
  res.status(404).render('404', {
    title: "404 Not Found"
  });
});