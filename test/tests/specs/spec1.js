const chai = require('chai');
chai.use(require('chai-subset'));
chai.use(require('chai-json-schema'));
const dictionaryAPI = require('../API/dictionaryAPI')
const Logger = require('../../main/utils/log/logger');
const JSONLoader = require('../../main/utils/data/JSONLoader');

chai.should();

describe('Dictionary API test suite:', async () => {
  beforeEach(function () { // eslint-disable-line func-names
    if (!JSONLoader.configData.parallel) Logger.log(this.currentTest.title);
  });

  let createdId;

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
    response.data.should.be.jsonSchema(JSONLoader.templatePDF)
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

  it('Test getByFieldValue:', async () => {
    const response = await dictionaryAPI.getByFieldValue();
    response.status.should.be.equal(200);
    response.data.should.be.jsonSchema(JSONLoader.fieldValueSchema);
  });

  it('Test getByFieldValue:', async () => {
    const response = await dictionaryAPI.getByFieldValue();
    response.status.should.be.equal(200);
    response.data.should.be.jsonSchema(JSONLoader.fieldValueSchema);
  });


  it('Create method', async () => {
    try {
      const responseCreate = await dictionaryAPI.create();
      responseCreate.status.should.be.equal(200);
      createdId = responseCreate.data.data.id;
      responseCreate.data.should.be.jsonSchema(JSONLoader.templateResponse.weekend.create);
      console.log("Created Id:", createdId);
    } catch (error) {
      console.error('Error during Create operation:', error);
    }
  });

  it('Read method', async () => {
    if (!createdId) {
      throw new Error('No ID available for reading');
    }
    try {
      const responseRead = await dictionaryAPI.read(createdId);
      responseRead.status.should.be.equal(200);
      console.log("ID after read:", createdId);
    } catch (error) {
      console.error('Error during Read operation:', error);
    }
  });

  it('Update method', async () => {
    if (!createdId) {
      throw new Error('No ID available for updating');
    }
    try {
      const responseUpdate = await dictionaryAPI.update(createdId);
      responseUpdate.status.should.be.equal(200);
      responseUpdate.data.should.be.jsonSchema(JSONLoader.templateResponse.weekend.update);
      console.log('Update successful for ID:', createdId);
    } catch (error) {
      console.error('Error during Update operation:', error);
    }
  });

  it('Delete method', async () => {
    if (!createdId) {
      throw new Error('No ID available for deleting');
    }
    try {
      const responseDelete = await dictionaryAPI.deleteProduct(createdId);
      responseDelete.status.should.be.equal(200);
      responseDelete.data.should.be.jsonSchema(JSONLoader.templateResponse.weekend.delete);
      console.log('Delete successful for ID:', createdId);
    } catch (error) {
      console.error('Error during Delete operation:', error);
    }
  });

  it('Test getWithChildren:', async () => {
    const response = await dictionaryAPI.getWithChildren();
    response.status.should.be.equal(200);
  });

  it('Test getWithQuery:', async () => {
    const response = await dictionaryAPI.getWithQuery();
    response.status.should.be.equal(200);
  });

  afterEach(function () { // eslint-disable-line func-names
    if (!JSONLoader.configData.parallel) Logger.log(this.currentTest.state);
  });
});