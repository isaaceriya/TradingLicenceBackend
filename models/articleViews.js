/**
 * 
 * 
 * Count's the views for a specific profile
 * 
 * 
 */

const db = require('../helpers/database');

/**
 * Attempts to connect with the API
 * @param {number} id - Takes in the value of id
 * @returns {boolean} - Returns True or false
 */

//adds a new view record (done every time an article is viewed)
exports.add = async function add (id) {
  let query = "INSERT INTO articleViews SET articleId=?; ";
  await db.run_query(query, [id]);
}

/**
 * Attempts to connect with the API
 * @param {number} id - Takes in the value of id
 * @returns {boolean} - Returns True or false
 */

//counts the views for an article
exports.count = async function count (id) {
  let query = "SELECT count(1) as views FROM articleViews WHERE articleId=?;";
/**
 * Attempts to connect with the API
 * @param {string} query - Takes in the value of id
 * @returns {boolean} - Returns True or false
 */
  const result = await db.run_query(query, [id]);
  return result;
}
