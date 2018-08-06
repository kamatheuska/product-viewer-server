const { mockHttpObjects } = require('./middleware')
const { populateCollection, clearCollection} = require('./collection')

const seed = {
  products: [
    {
      'title': 'APARADOR DANES MARRON AMARILLO AZUL ROJO CHAPEADO',
      'model': 10002999,
      'description': 'APARADOR DANES MARRON .  CHAPEADO EN PALISANDRO CON CAJA DE ESPEJO  60S . H. 114   A. 41  L. 200 CM.',
      'rates': { 'pvp': { 'unit': 1700 } },
      'setup': { 'keywords': 'APARADOR MARRON' },
      'specs': {
        'amount': { 'collection': { 'isCollection': false }, 'units': 1 }, 
        'color': 'MARRON'
      }
    },
    {
      'title': 'APARADOR DANES TEKA',
      'model': 10003888,
      'description': 'APARADOR DANES TEKA MARRON AMARILLO UNIQUE AZUL ROJO MARRON FABRICADO POR  RT MOBEL. L.226 H. 86 A. 44 CM.',
      'rates': { 'pvp': { 'unit': 2600 } },
      'setup': { 'keywords': 'APARADOR MARRON' },
      'specs': {
        'amount': { 'collection': { 'isCollection': false }, 'units': 1 }, 
        'color': 'MARRON'
      }
    },
    {
      'title': 'APARADORES SET 2 UND. EN',
      'model': 10006777,
      'description': 'APARADORES SET 2 UND.  EN MADERA  DE PALISANDRO  MARRON AMARILLO AZUL ROJO ESPEJO .  60S H. 53 L. 100  A. 50 CM.',
      'rates': { 'pvp': { 'unit': 1900 } },
      'setup': { 'keywords': 'APARADORES MARRON' },
      'specs': {
        'amount': { 'collection': { 'isCollection': false }, 'units': 1 }, 
        'color': 'MARRON'
      }
    }
  ],
  designers: [
    {
      // name: 'Nicolas Ramirez',
      name: 99991232,
      country: 'ALEMANIA',
      bio: {
        born: 1400,
        died: 1450,
        body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      }
    },
    {
      name: 'Juan Bitola Ramirez',
      country: 'ESPAÑA',
      bio: {
        born: 1400,
        died: 1450,
        body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      }
    },
    {
      name: 'Perito Bitola',
      country: 'AUSTRALIA',
      bio: {
        born: 1960,
        died: 1990,
        body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      }
    },
    {
      name: 'Gorgonzola Perentelo Bitola',
      country: 'NUEVA ZELANDA',
      bio: {
        born: 1960,
        died: 1990,
        body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      }
    }
  ],
  manufacturers: [
    { name: 'Coca Cola', country: 'ALEMANIA' },
    { name: 'Nike', country: 'JAPON' },
    { name: 'Adidas', country: 'ESPAÑA' }
  ],
  buffer: new Buffer(`modelo,nombre,precio,categoria,stock total
10001,Alfombra roja negra marroqui en lana sobre lana  patron negro sobre fondo gris claro. ,950,DECORACION ,1
10002,Aparador danes marron . Chapeado en palisandro con caja de espejo  60S . H. 114   A. 41  L. 200 cm.,1700,ALMACENAMIENTO///APARADORES:::ALMACENAMIENTO,1
10003,Aparador danes teka  . Marron fabricado por  RT Mobel. L.226 H. 86 A. 44 cm.,2600,ALMACENAMIENTO///APARADORES:::ALMACENAMIENTO,1
10006,Aparadores Set 2 und. En madera  de palisandro marron.  60S H. 53 L. 100  A. 50 cm.,1900,ALMACENAMIENTO///APARADORES:::ALMACENAMIENTO,1
`)
}
module.exports = {
  populateCollection,
  clearCollection,
  mockHttpObjects,
  seed
}
