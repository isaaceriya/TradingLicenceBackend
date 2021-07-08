/**
 * Message route test
 */


const request = require('supertest')
const app = require('../app')

describe('Post new message', () => {
  it('should allow spaces', async () => {
    const res = await request(app.callback())
      .post('/api/v1/messages')
      .send({
        title: 'PepsiCity', // Company name
        summary: 'Technical Issue',  // Type of issue
        imageURL: '07567890876'  // Email
      })
    expect(res.statusCode).toEqual(201)
    expect(res.body).toHaveProperty('created', true)
  })
});

describe('Post new message', () => {
  it('should create a new message', async () => {
    const res = await request(app.callback())
      .post('/api/v1/messages')
      .send({
        title: 'PepsiCity', // Company name
        summary: 'Technical',  // Type of issue
        imageURL: 'test23@gmail.com'  // Email
      })
    expect(res.statusCode).toEqual(201)
    expect(res.body).toHaveProperty('created', true)
  })
});


describe('Post new messages', () => {
  it('should allow duplicate messages', async () => {
    const res = await request(app.callback())
      .post('/api/v1/messages')
      .send({
        title: 'PepsiCity', // Company name
        summary: '20JamaicaRoad',  // Company Address
        imageURL: 'test23@gmail.com'  // Company Number
      })
    expect(res.statusCode).toEqual(201)
    expect(res.body).toHaveProperty('created', true)
  })
});



describe('Empty field', () => {
  it('Should allow the empty email field', async () => {
    const res = await request(app.callback())
      .post('/api/v1/messages')
      .send({
        title: 'PepsiCity', // Company name
        summary: 'Technical',  // Type of issue
        imageURL: ''  // Email
      })
    expect(res.statusCode).toEqual(201)
  })
});


describe('Get all articles', () => {
  it('Should allow', async () => {
    const res = await request(app.callback())
      .get('/api/v1/messages')
    expect(res.statusCode).toEqual(200)
  })
});


describe('Get all articles', () => {
  it('Should not allow', async () => {
    const id = 'PepsiCity'
    const res = await request(app.callback())
      .get('/api/v1/messages/${id}')
    expect(res.statusCode).toEqual(404)
  })
});