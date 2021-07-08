const Koa = require('koa');
const cors = require('@koa/cors');
const app = new Koa();

app.use(cors());

const special = require('./routes/special.js')
const articles = require('./routes/articles.js');
const messages = require('./routes/messages.js');
const users = require('./routes/users.js');

app.use(special.routes());
app.use(articles.routes());
app.use(messages.routes());
app.use(users.routes());

module.exports = app;
