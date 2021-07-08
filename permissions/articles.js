/**
 * Access control for the articles
 */

const AccessControl = require('role-acl');
const ac = new AccessControl();

// controls for specific CRUD operations on article records
// doesn't let anyone other than the admin update an article ID or the authorID
ac
  .grant('user')
  .condition({Fn:'EQUALS', args: {'requester':'$.owner'}})
  .execute('update')
  .on('article');



ac
  .grant('user')
  .condition({Fn:'EQUALS', args: {'requester':'$.owner'}})
  .execute('update')
  .on('article', ['title', 'allText', 'summary', 'imageURL']);

ac
  .grant('user')
  .execute('delete')
  .on('article');

ac
  .grant('user')
  .execute('update')
  .on('article');


exports.readAll = (requester) => {
  return ac
    .can(requester.role)
    .execute('read')
    .sync()
    .on('article');
}

exports.read = (requester, data) => {
  return ac
    .can(requester.role)
    .context({requester:requester.ID, owner:data.ID})
    .execute('read')
    .sync()
    .on('article');
}



exports.update = (requester, data) => {
    console.log(requester)
    console.log(data)
  return ac
    .can(requester.role)
    .context({requester:requester.ID, owner:data.authorID})
    .execute('update')
    .sync()
    .on('article');
}

exports.delete = (requester) => {
  return ac
    .can(requester.role)
    .execute('delete')
    .sync()
    .on('article');
}
