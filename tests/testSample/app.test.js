const request = require('supertest')

const app = require('../app')
const { Product } = require('../models/Product')
const { populateProducts, seedProduct } = require('./seed/seed')

beforeEach(populateProducts)

describe('POST /products', () => {

  describe('MANAGING the database', () => {
    it('should create a new product in the db', (done) => {
      let item = {
        title: "ALAMBRE DE MARMOL",
        rates: {
          pvp: {
            unit: 23
          }
        },
        setup: {
          family: "muebles",
          category: " "
        },
        specs: {
          amount: {
            collection:{
              isCollection: false
            }
          }
        }
      }

      request(app)
        .post('/products/add')
        .send(item)
        .expect(200)
        .then((res) => {
          expect(res.body).toMatchObject(item)
          expect(res).toBeTruthy()

          Product.findById(res.body._id).then((item) => {
            expect(item._id).toBeTruthy()
            console.log(item);
            done()
          })
        .catch(e => done(e))
        })
    })

    it('should fail to create a new object in the db', (done) => {
      let item = {
        title: "ALAMBRE DE MARMOL",
        rates: {
          pvp: {
            unit: 0
          }
        },
        setup: {
          family: "muebles",
          category: ""
        },
        specs: {
          amount: {
            collection:{
              isCollection: false
            }
          }
        }
      }

      request(app)
        .post('/products/add')
        .send(item)
        .expect(400)
        .then(() => done())
        .catch(e => done(e))
    })
  })

  describe('CREATE a new job for the printer', () => {
    describe('SETTING GRID', () => {
      it.skip('should print and return an array with strings', (done) => {
        let selled = [
          {
            _ID: 1040010,
            CANT: 1,
            ARTICULO: 'SILLA SIGLO XIX',
            PVP: 200,
            TOTAL: 100
          },
          {
            _ID: 1040011,
            CANT: 1,
            ARTICULO: 'MESA DE MARMOL',
            PVP: 2200,
            TOTAL: 100
          }
        ]

        request(app)
          .post('/products/sell')
          .send(selled)
          .expect(200)
          .then((data) => {
            let result = JSON.parse(data.text)
            expect(result).toBeInstanceOf(Array)
            expect(result.length).toBe(2)
            done()
          })
          .catch(err => done(err))
      })
    })
  })
})

