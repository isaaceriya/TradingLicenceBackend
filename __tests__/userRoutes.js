/**
 * User route test
 */


const request = require('supertest')
const app = require('../app')

describe('Post new user', () => {
  it('should create a new user', async () => {
    const res = await request(app.callback())
      .post('/api/v1/users')
      .send({
        username: 'bri3',
        password: 'password',
        email: 'unqa@gmail.com'
      })
    expect(res.statusCode).toEqual(201)
    expect(res.body).toHaveProperty('created', true)
  })
});


describe('User creating failed', () => {
  it('should fail for duplicate user', async () => {
    const res = await request(app.callback())
      .post('/api/v1/users')
      .send({
        username: 'bri3',
        password: 'password',
        email: 'unqa@gmail.com'
      })
    expect(res.statusCode).toEqual(500)
  })
});


describe('User creating failed', () => {
  it('Wrong email format', async () => {
    const res = await request(app.callback())
      .post('/api/v1/users')
      .send({
        username: 'challenge',
        password: 'password',
        email: 'unidd'
      })
    expect(res.statusCode).toEqual(400)
  })
});


describe('User creating failed', () => {
  it('Empty field', async () => {
    const res = await request(app.callback())
      .post('/api/v1/users')
      .send({
        username: 'rock',
        password: '',
        email: 'uniwud@gmail.com'
      })
    expect(res.statusCode).toEqual(400)
  })
});


describe('Get all users', () => {
  it('No permision', async () => {
    const res = await request(app.callback())
      .get('/api/v1/users')
    expect(res.statusCode).toEqual(401)
  })
});






