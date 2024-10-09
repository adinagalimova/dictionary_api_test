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

  it('Test getMKBInfo:', async () => {
    const response = await dictionaryAPI.getMKBInfo();
    response.status.should.be.equal(200);
    response.data.should.be.containSubset(JSONLoader.templateResponse.weekend.getMKBInfo);
  });

  it('Test getTables:', async () => {
    const response = await dictionaryAPI.getTables();
    response.status.should.be.equal(200);
    response.data.should.be.jsonSchema(JSONLoader.tablesResponseSchema);
  });

  it('Test getTableFields:', async () => {
    const response = await dictionaryAPI.getTableFields();
    response.status.should.be.equal(200);
    response.data.should.be.containSubset(JSONLoader.templateResponse.weekend.getTableFields);
  });

  it('Test getTemplateBody:', async () => {
    const response = await dictionaryAPI.getTemplateBody();
    response.status.should.be.equal(200);
    response.data.should.be.jsonSchema(JSONLoader.templateResponse.weekend.templateBody);
  });

  it('Test getAll:', async () => {
    const response = await dictionaryAPI.getAll();
    response.status.should.be.equal(200);
    response.data.should.be.jsonSchema(JSONLoader.allProductsResponseSchema);
  });

  afterEach(function () { // eslint-disable-line func-names
    if (!JSONLoader.configData.parallel) Logger.log(this.currentTest.state);
  });
});
