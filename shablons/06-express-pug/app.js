// pug template example

const express = require('express')
const app = express()

const fixtures = require('../fixtures')

app.set('views', './views')
app.set('view engine', 'pug')

app.get('*', (req, res) => {
  console.log('--- ', req.url)
  res.render('index', { f: fixtures })
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
