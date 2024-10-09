const chai = require('chai');
chai.use(require('chai-subset'));
chai.use(require('chai-json-schema'));
const dictionaryAPI = require('../API/dictionaryAPI');
const Logger = require('../../main/utils/log/logger');
const JSONLoader = require('../../main/utils/data/JSONLoader');

chai.should();

describe('Dictionary API test suite:', async () => {
  beforeEach(function () { // eslint-disable-line func-names
    if (!JSONLoader.configData.parallel) Logger.log(this.currentTest.title);
  });

  it('Test Fetch All Test Clients:', async () => { // eslint-disable-next-line prefer-const
    const response = await dictionaryAPI.fetchAllTestClients();
    response.status.should.be.equal(200);
    response.data.should.be.jsonSchema(JSONLoader.testClientsResponseSchema);
  });

  it('Test syncMarks:', async () => {
    const response = await dictionaryAPI.syncMarks();
    response.status.should.be.equal(200);
    response.data.should.containSubset(JSONLoader.templateResponse.syncMarks);
  });

  it('Test syncModels:', async () => {
    const response = await dictionaryAPI.syncModels();
    response.status.should.be.equal(200);
    response.data.should.containSubset(JSONLoader.templateResponse.syncModels);
  });

  it('Test getDay:', async () => {
    const response = await dictionaryAPI.getDay();
    response.status.should.be.equal(200);
    response.data.should.containSubset(JSONLoader.templateResponse.weekend.getDay);
  });

  it('Test getMonth:', async () => {
    const response = await dictionaryAPI.getMonth();
    response.status.should.be.equal(200);
    response.data.should.containSubset(JSONLoader.templateResponse.weekend.getMonth);
  });

  afterEach(function () { // eslint-disable-line func-names
    if (!JSONLoader.configData.parallel) Logger.log(this.currentTest.state);
  });
});
