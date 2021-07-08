/**
 * User route test
 */


const request = require('supertest')
const app = require('../app')

describe('Post new application', () => {
  it('should allow spaces', async () => {
    const res = await request(app.callback())
      .post('/api/v1/articles')
      .send({
        title: 'PepsiCity', // Company name
        summary: '20 Jamaica Road',  // Company Address
        imageURL: '07567890876'  // Company Number
      })
    expect(res.statusCode).toEqual(201)
    expect(res.body).toHaveProperty('created', true)
  })
});

describe('Post new application', () => {
  it('should create a new application', async () => {
    const res = await request(app.callback())
      .post('/api/v1/articles')
      .send({
        title: 'PepsiCity', // Company name
        summary: '20JamaicaRoad',  // Company Address
        imageURL: '07567890876'  // Company Number
      })
    expect(res.statusCode).toEqual(201)
    expect(res.body).toHaveProperty('created', true)
  })
});


describe('Post new application', () => {
  it('should create a new application', async () => {
    const res = await request(app.callback())
      .post('/api/v1/articles')
      .send({
        title: 'PepsiCity', // Company name
        summary: '20JamaicaRoad',  // Company Address
        imageURL: '07567890876'  // Company Number
      })
    expect(res.statusCode).toEqual(201)
    expect(res.body).toHaveProperty('created', true)
  })
});



describe('Empty field', () => {
  it('application creation failed', async () => {
    const res = await request(app.callback())
      .post('/api/v1/articles')
      .send({
        title: 'PepsiCity', // Company name
        summary: '20 Jamaica Road',  // Company Address
        imageURL: ''  // Company Number
      })
    expect(res.statusCode).toEqual(201)
  })
});


describe('Get all articles', () => {
  it('Should allow', async () => {
    const res = await request(app.callback())
      .get('/api/v1/articles')
    expect(res.statusCode).toEqual(200)
  })
});


describe('Get all articles', () => {
  it('Should allow', async () => {
    const id = 'PepsiCity'
    const res = await request(app.callback())
      .get('/api/v1/articles/${id}')
    expect(res.statusCode).toEqual(404)
  })
});