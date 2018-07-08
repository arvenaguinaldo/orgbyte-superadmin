require('babel-register')();

const jsdom = require('jsdom').jsdom;

const exposedProperties = ['window', 'navigator', 'document'];

global.document = jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};

global.OMS_API_PORT = process.env.OMS_API_PORT;
global.BACKEND_API_PORT = process.env.BACKEND_API_PORT;

// documentRef = document;
const mockCssModules = require('mock-css-modules');

mockCssModules.register(['.scss']);

// chai utilities
const chai = require('chai');
chai.use(require('dirty-chai'));
chai.use(require('chai-enzyme')());
