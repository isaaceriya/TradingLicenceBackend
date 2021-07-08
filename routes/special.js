/**
 * Connects with the API to check if a user is active
 * 
 */

const Router = require('koa-router');
const auth = require('../controllers/auth');

const router = Router({prefix: '/api/v1'});

router.get('/', publicAPI);
router.get('/private', auth, privateAPI);

/**
 * Attempts to connect with the API
 * @param {string} ctx - Takes in the integer ctx
 * @returns {string} - Returns string message
 */
function publicAPI(ctx) {  
  ctx.body = {message: 'PUBLIC PAGE: You requested a new message URI (root) of the API'}
}
/**
 * Checks if user is registered
 * @param {string} ctx - Takes in the integer ctx
 * @returns {string} - Returns string message
 */
function privateAPI(ctx) {
  const user = ctx.state.user;
  ctx.body = {message: `Hello ${user.username} you registered on ${user.dateRegistered}`} 
}

module.exports = router;
