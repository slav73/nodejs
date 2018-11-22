// handlebars template example

const express = require('express')
const app = express()
const hbs = require('hbs')
const path = require('path')

const fixtures = require('../fixtures')

hbs.registerPartials(path.join(__dirname, '/views/partials'))
app.set('views', './views')
app.set('view engine', 'hbs')

hbs.registerHelper('bold', (context, options) => {
  // console.log('context', context);
  // console.log('options', options);
  return new hbs.SafeString(`<div class="bold"> ${options.fn(context)} </div>`)
})

hbs.registerHelper('whichPartial', options => {
  // console.log(options.hash.condition);
  return options.hash.condition === 'block' ? 'block' : 'user'
})

hbs.registerHelper('link', (context, options) => {
  const attrs = []
  for (let prop in options.hash) {
    attrs.push(`${prop} = "${options.hash[prop]}"`)
  }
  // console.log(attrs)
  return new hbs.SafeString(`<a ${attrs.join(' ')} > ${context} </a>`)
})

app.get('*', (req, res) => {
  console.log('--- ', req.url)
  res.render('index', { f: fixtures })
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
