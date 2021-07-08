/**
 * 
 * 
 * Users model file
 * 
 * 
 */


const db = require('../helpers/database');
const bcrypt = require('bcrypt');

/**
 * Gets the user by ID
 * @param {number} id - Takes in the integer ctx
 * @returns {object} - database information
 */
//gets a single user by its id  
exports.getById = async function getById (id) {
  const query = "SELECT * FROM users WHERE ID = ?;";
  const values = [id];
  const data = await db.run_query(query, values);
  return data;
}

/**
 * Gets the user by username
 * @param {string} username - Takes in the integer ctx
 * @returns {object} - database information
 */
//gets a single user by the (unique) username
exports.findByUsername = async function getByUsername(username) {
  const query = "SELECT * FROM users WHERE username = ?;";
  const user = await db.run_query(query, username);
  return user;
}

/**
 * Get's all values
 * @param {number} page- Takes in the page number
 * @param {number} limit - The max value
 * @param {number} order - The order
 * @returns {object} - database information
 */

//lists all the users in the database
exports.getAll = async function getAll (page, limit, order) {
  const query = "SELECT * FROM users;";
  const data = await db.run_query(query);
  return data;
}

/**
 * Creates the user
 * @param {string} user - Takes in the integer ctx
 * @returns {object} - database information
 */
//creates a new user in the database
exports.add = async function add (user) {
  const query = "INSERT INTO users SET ?";
  const password = user.password;
  const hash = bcrypt.hashSync(password, 10);
  user.password = hash;
  const data = await db.run_query(query, user);
  return data;
}

/**
 * Deletes the user
 * @param {string} user - Takes in the integer ctx
 * @returns {boolean} - Returns True or False
 */

//deletes a user by its id
exports.delById = async function delById (id) {
  const query = "DELETE FROM users WHERE ID = ?;";
  const values = [id];
  const data = await db.run_query(query, values);
  return data;
}

/**
 * Updates the user
 * @param {string} user - Takes in the integer ctx
 * @returns {boolean} - Returns True or False
 */
//updates an existing user
exports.update = async function update (user) {
  const query = "UPDATE users SET ? WHERE ID = ?;";
  if (user.password) {
    const password = user.password;
    const hash = bcrypt.hashSync(password, 10);
    user.password = hash;  
  }
  const values = [user, user.ID];
  const data = await db.run_query(query, values);
  return data;
}