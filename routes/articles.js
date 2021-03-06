/**
 * Checks active routes
 * 
 */

const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const auth = require('../controllers/auth');
const can = require('../permissions/articles');

const articles = require('../models/articles');
const articleViews = require('../models/articleViews');

const {validateArticle, validateComment} = require('../controllers/validation');

const prefix = '/api/v1/articles';
const router = Router({prefix: prefix});

// article routes
router.get('/', getAll);
router.post('/', bodyParser(), validateArticle, createArticle);
router.get('/:id([0-9]{1,})', getById);
router.put('/:id([0-9]{1,})', auth, bodyParser(), validateArticle, updateArticle);
router.del('/:id([0-9]{1,})',auth, deleteArticle);


// views route
router.get('/:id([0-9]{1,})/views', getViewCount);

/**
 * Checks active routes
 * @param {number} ctx - Takes in the integer ctx
 * @returns {object} - database information
 */
async function getAll(ctx) {
  let {page=1, limit=10, order='dateCreated', direction='DESC'} = ctx.request.query;

  // ensure params are integers
  limit = parseInt(limit);
  page = parseInt(page);
  
  // validate pagination values to ensure they are sensible
  limit = limit > 100 ? 100 : limit;
  limit = limit < 1 ? 10 : limit;
  page = page < 1 ? 1 : page;

  // ensure order and direction make sense
  order = ['dateCreated', 'dateModified'].includes(order) ? order : 'dateCreated';
  direction = ['ASC', 'DESC'].includes(direction) ? direction : 'ASC';

  const result = await articles.getAll(page, limit, order, direction);
  if (result.length) {
    const body = result.map(post => {
      // extracts the post fields we want to send back (summary details)
      const {ID, title, summary, imageURL, authorID} = post;
      // adds links to the post summaries for HATEOAS compliance
      // clients can follow these to find related resources
      return {ID, title, summary, imageURL, authorID};
    });
    ctx.body = body;
  }
}


/**
 * Checks active routes
 * 
 * @param {number} ctx - Takes in the integer ctx
 * @returns {object} - Returns the value base on the ID
 */
async function getById(ctx) {
  //gets the item based on the id
  const id = ctx.params.id;
  const result = await articles.getById(id);
  if (result.length) {
    await articleViews.add(id);  // add a record of being viewed
    const article = result[0];
    ctx.body = article;
  }
}

/**
 * Create a new value in the database
 * 
 * @param {number} ctx - Takes in the integer ctx
 * @returns {boolean} - Returns whether it has been created or not "True or false"
 */
async function createArticle(ctx) {
  // Creates new article
  const body = ctx.request.body;
  const result = await articles.add(body);
  if (result.affectedRows) {
    const id = result.insertId;
    ctx.status = 201;
    ctx.body = {ID: id, created: true, link: `${ctx.request.path}/${id}`};
  }
}

/**
 * Update article function
 * 
 * @param {number} ctx - Takes in the integer ctx
 * @returns {boolean} - Returns whether it has been updated or not "True or false"
 */
async function updateArticle(ctx) {
  //Updates the article
  const id = ctx.params.id;
  let result = await articles.getById(id);  // check it exists
  if (result.length) {
    let article = result[0];
    const permission = can.update(ctx.state.user, article);
    if (!permission.granted) {
      ctx.status = 403;
    } else {
      // exclude fields that should not be updated
      const {ID, dateCreated, dateModified, authorID, ...body} = ctx.request.body;
      // overwrite updatable fields with remaining body data
      Object.assign(article, body);
      result = await articles.update(article);
      if (result.affectedRows) {
        ctx.body = {ID: id, updated: true, link: ctx.request.path};
      }
    }
  }
}

/**
 * Deletes from the database
 * 
 * @param {number} ctx - Takes in the integer ctx
 * @returns {boolean} - Returns whether it has been deleted or not "True or false"
 */
async function deleteArticle(ctx) {
  //Deletes the article
  const permission = can.delete(ctx.state.user);
  if (!permission.granted) {
    ctx.status = 403;
  } else {
    const id = ctx.params.id;
    const result = await articles.delById(id);
    if (result.affectedRows) {
      ctx.body = {ID: id, deleted: true}
    }
  }
}

/**
 * Checks active routes
 * 
 * @param {number} ctx - Takes in the integer ctx
 * @returns {boolean} - Returns whether it has been added or not "True or false"
 */
async function getViewCount(ctx) {
  //Gets the view count
  const id = ctx.params.id;
  const result = await articleViews.count(id);
  if (result.length) {
    ctx.body = {ID: id, views: result[0].views};
  }
}


module.exports = router;
