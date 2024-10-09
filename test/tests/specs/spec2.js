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

  it('Test getYear:', async () => {
    const response = await dictionaryAPI.getYear();
    response.status.should.be.equal(200);
    response.data.should.containSubset(JSONLoader.templateResponse.weekend.getYear);
  });

  it('Test getPeriod:', async () => {
    const response = await dictionaryAPI.getPeriod();
    response.status.should.be.equal(200);
    response.data.should.containSubset(JSONLoader.templateResponse.weekend.getPeriod);
  });

  it('Test getWorkDay:', async () => {
    const response = await dictionaryAPI.getWorkDay();
    response.status.should.be.equal(200);
    response.data.should.containSubset(JSONLoader.templateResponse.weekend.getWorkDay);
  });

  it('Test getCurrency:', async () => {
    const response = await dictionaryAPI.getCurrency();
    response.status.should.be.equal(200);
  });

  it('Test getPDF:', async () => {
    const response = await dictionaryAPI.getPDF();
    response.status.should.be.equal(200);
    response.data.should.be.jsonSchema(JSONLoader.templatePDF);
  });

  afterEach(function () { // eslint-disable-line func-names
    if (!JSONLoader.configData.parallel) Logger.log(this.currentTest.state);
  });
});
