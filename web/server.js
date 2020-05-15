const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app
  .prepare()
  .then(() => {
    const server = express()

    server.get('/om-huset/tidslinje', (req, res) => {
      app.render(req, res, '/timeline')
    })

    server.get('/om-huset/bilder', (req, res) => {
      app.render(req, res, '/images')
    })

    server.get('/om-huset/bilder/:id', (req, res) => {
      const id = req.params.id
      app.render(req, res, '/image', { id })
    })

    server.get('/om-huset/:slug', (req, res) => {
      const slug = req.params.slug
      app.render(req, res, '/history-article', { slug })
    })

    server.get('/foreningen/:slug', (req, res) => {
      const slug = req.params.slug
      app.render(req, res, '/information-article', { slug })
    })

    server.get('/foreningen', (req, res) => {
      app.render(req, res, '/foreningen')
    })

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(3000, err => {
      if (err) throw err
      console.log('> Ready on http://localhost:3000')
    })
  })
  .catch(ex => {
    console.error(ex.stack)
    process.exit(1)
  })
