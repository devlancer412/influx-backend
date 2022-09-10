const app = require('./config/express')
const routes = require('./routes/index.route')

// Router
app.use('/api', routes)


if (process.env.NODE_ENV === 'development') {
  app.listen(
    app.get('port'),
    () => {
      console.log(
        `Server running at http://${app.get('host')}:${app.get('port')}`
      )
    }
  )
} else {
  // 
}