
const { Product } = require('../../models/Product')
const products = [
    {
        title: "MESA DE MARMOL",
        rates: {
            pvp: {
                unit: 23
            }
        },
        setup: {
            family: "muebles",
            category: "mesas"
        },
        specs: {
            amount: {
                collection:{
                    isCollection: false
                }
            }
        }
    },
    {
        title: "GORRION DE ORO BLANC",
        rates: {
            pvp: {
                unit: 1000
            }
        },
        setup: {
            family: "objets",
            category: "metales"
        },
        specs: {
            amount: {
                collection:{
                    isCollection: false
                }
            }
        }
    },
    {
        title: "SILLA DE MADERA",
        rates: {
            pvp: {
                unit: 300
            }
        },
        setup: {
            family: "muebles",
            category: "silla"
        },
        specs: {
            amount: {
                collection:{
                    isCollection: false
                }
            }
        }
    }
]

const populateProducts = (done) => {
    Product.remove({}).then(() => {
        let productOne = new Product(products[0]).save()
    }).then(() => done())
}

module.exports = { 
    populateProducts,
    products
}