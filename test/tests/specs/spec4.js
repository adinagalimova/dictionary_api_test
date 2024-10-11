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

  it('Test getByFieldValue:', async () => {
    const response = await dictionaryAPI.getByFieldValue();
    response.status.should.be.equal(200);
    response.data.should.be.jsonSchema(JSONLoader.fieldValueSchema);
  });

  it('Create method', async () => {
    const responseCreate = await dictionaryAPI.createProduct();
    responseCreate.status.should.be.equal(200);
    responseCreate.data.should.be.jsonSchema(JSONLoader.templateResponse.weekend.create);
  });

  it('Read method', async () => {
    const responseCreate = await dictionaryAPI.createProduct();
    responseCreate.status.should.be.equal(200);
    const createdId = responseCreate.data.data.id;
    const responseRead = await dictionaryAPI.readProduct(createdId);
    responseRead.status.should.be.equal(200);
  });

  it('Update method', async () => {
    const responseCreate = await dictionaryAPI.createProduct();
    responseCreate.status.should.be.equal(200);
    const createdId = responseCreate.data.data.id;
    const responseUpdate = await dictionaryAPI.updateProduct(createdId);
    responseUpdate.status.should.be.equal(200);
    responseUpdate.data.should.be.jsonSchema(JSONLoader.templateResponse.weekend.update);
  });

  it('Delete method', async () => {
    const responseCreate = await dictionaryAPI.createProduct();
    responseCreate.status.should.be.equal(200);
    const createdId = responseCreate.data.data.id;
    const responseDelete = await dictionaryAPI.deleteProduct(createdId);
    responseDelete.status.should.be.equal(200);
    responseDelete.data.should.be.jsonSchema(JSONLoader.templateResponse.weekend.delete);
  });

  it('Test getWithChildren:', async () => {
    const response = await dictionaryAPI.getWithChildren();
    response.status.should.be.equal(200);
  });

  it('Test getWithQuery:', async () => {
    const response = await dictionaryAPI.getWithQuery();
    response.status.should.be.equal(200);
    response.data.should.be.jsonSchema(JSONLoader.queryResponseSchema);
  });

  afterEach(function () { // eslint-disable-line func-names
    if (!JSONLoader.configData.parallel) Logger.log(this.currentTest.state);
  });
});
