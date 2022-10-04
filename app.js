const app = require('./config/express');
const routes = require('./routes/index.route');
// const socialCtr = require('./controllers/social.controller');
const serverless = require('serverless-http');

// Router
app.get('/test', (req, res) => res.json('Test'));
app.use('/api', routes);

exports.handler = serverless(app);
// socialCtr.storeTelegram();
// socialCtr.storeTiktok();
// socialCtr.storeTwitter();
// socialCtr.storeInstagram('socialblade', 1);
// socialCtr.storeYoutube();

// if (process.env.NODE_ENV === 'development') {
//   app.listen(app.get('port'), () => {
//     console.log(
//       `Server running at http://${app.get('host')}:${app.get('port')}`
//     );
//   });
// } else {
//   //
// }
