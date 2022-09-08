const app = require('./config/express')
const routes = require('./routes/index.route')

// Router
app.use('/api', routes)


if (process.env.NODE_ENV === 'development') {
  app.listen(
    process.env.APP_PORT || 5000,
    () => {
      console.log(
        `Server running at https://${app.get('host')}:${app.get('port')}`
      )
    }
  )
} else {
  // 
}