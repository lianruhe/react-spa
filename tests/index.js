import chai from 'chai'
import sinonChai from 'sinon-chai'
// import Promise from 'nuo'

localStorage.clear()

chai.use(sinonChai)

// global.Promise = Promise
global.assert = chai.assert
global.expect = chai.expect

// require specs test files (files that ends with .spec.js)
const testsContext = require.context('./', true, /^\.[/\\]specs(.)*\.spec\.js$/)
testsContext.keys().forEach(testsContext)

// require all src files except index.js for coverage.
// you can also change this to match only the subset of files that
// you want coverage for.
const componentsContext = require.context('../', true, /^\.[/\\]lib(.)*(\.js)$/)
componentsContext.keys().forEach(componentsContext)
