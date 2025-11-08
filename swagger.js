// swagger.js
const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contacts API',
    description: 'API to manage contacts (GET, POST, PUT, DELETE)',
    version: '1.0.0',
  },
  host: 'localhost:3000', 
  schemes: ['https', 'http'],
  definitions: {
    Contact: {
      firstName: 'Gaby',
      lastName: 'Ugarte',
      email: 'gaby@example.com',
      favoriteColor: 'Purple',
      birthday: '1995-07-19',
    },
  },
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js']; 

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {

  require('./server.js');
});
