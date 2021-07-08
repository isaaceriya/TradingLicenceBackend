/**
 * Get's all the information on a specific profile
 * 
 * 
 * 
 */

const db = require('../helpers/database');

//get a single message by its id  
exports.getById = async function getById (id) {
  const query = "SELECT * FROM messages WHERE ID = ?;";
  const values = [id];
  const data = await db.run_query(query, values);
  return data;
}


/**
 * Get's value by location
 * @param {string} location- Takes in the location
 * @returns {object} - database information
 */

// gets message by its location
exports.getByLocation = async function getById (location) {
  const query = "SELECT * FROM messages WHERE location = ?;";
  const values = [location];
  const data = await db.run_query(query, values);
  return data;
}

/**
 * Get's all values
 * @param {number} page- Takes in the page number
 * @param {number} limit - The max value
 * @param {number} order - The order
 * @param {string} direction - The direction
 * @returns {object} - database information
 */

//lists all the messages in the database
exports.getAll = async function getAll (page, limit, order, direction) {
  const offset = (page - 1) * limit;
  let query;
  if (direction === 'DESC') {
    query = "SELECT * FROM messages ORDER BY ?? DESC LIMIT ? OFFSET ?;";
  } else {
    query = "SELECT * FROM messages ORDER BY ?? ASC LIMIT ? OFFSET ?;";    
  }
  const values = [order, parseInt(limit), parseInt(offset)];
  const data = await db.run_query(query, values);
  return data;
}

/**
 * Adds value
 * @param {string} message- Takes in the integer ctx
 * @returns {object} - returns {boolean} - Return true of false
 */
//creates a new message in the database
exports.add = async function add (article) {
  const query = "INSERT INTO messages SET ?";
  const data = await db.run_query(query, article);
  return data;
}

/**
 * Deletes values based on the ID
 * @param {number} id - The id of the return
 * @returns {boolean} - Return true of false
 */
//deletes an message by its id
exports.delById = async function delById (id) {
  const query = "DELETE FROM messages WHERE ID = ?;";
  const values = [id];
  const data = await db.run_query(query, values);
  return data;
}

/**
 * Updates values based on the ID
 * @param {number} id - The id of the return
 * @returns {boolean} - Return true of false
 */
//updates an existing message
exports.update = async function update (article) {
  const query = "UPDATE messages SET ? WHERE ID = ?;";
  const values = [article, article.ID];
  const data = await db.run_query(query, values);
  return data;
}