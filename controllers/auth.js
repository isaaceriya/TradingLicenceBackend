/**
 * A that sets up passport and its authentications strategies.
 * @module controllers/validation
 * @author Isaac Eriya
 * @see schemas/* for JSON Schema definition files
 */


// Importing this module in a route gives a middleware handler that can be used
// to protect downstream handlers by rejecting unauthenticated requests.

const passport = require('koa-passport');
const basicAuth = require('../strategies/basic');

passport.use(basicAuth);

module.exports = passport.authenticate(['basic'], {session:false});
