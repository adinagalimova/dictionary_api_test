const path = require('path');
const authAPI = require('./authAPI');
const BaseAPI = require('../../main/utils/API/baseAPI');
const JSONLoader = require('../../main/utils/data/JSONLoader');
require('dotenv').config({ path: path.join(__dirname, '../../../', '.env.test'), override: true });

class DictionaryAPI extends BaseAPI {
  #API;

  #options;

  constructor(options = {
    baseURL: '' || process.env.GATEWAY_URL,
  }) {
    super(options);
    this.#options = options;
  }

  async setToken() {
    const response = await authAPI.auth({ APIName: 'Dictionary API' });
    this.#options.headers = {};
    this.#options.headers.Authorization = `Bearer ${response.data.data.access_token}`;
    this.#API = new DictionaryAPI(this.#options);
  }

  async toggleServer() {
    const params = {
      setting: JSONLoader.configData.servers,
    };

    return this.#API.post(JSONLoader.APIEndpoints.dictionary.servers, params);
  }

  async toggleVerification() {
    const params = {
      value: Number(JSONLoader.configData.verification),
    };

    return this.#API.patch(JSONLoader.APIEndpoints.dictionary.verifyBool, params);
  }

  async fetchAllTestClients() {
    return this.#API.get(JSONLoader.APIEndpoints.dictionary.testClients);
  }

  async syncMarks() {
    return this.#API.get(JSONLoader.APIEndpoints.dictionary.syncMarks);
  }

  async syncModels() {
    return this.#API.get(JSONLoader.APIEndpoints.dictionary.syncModels);
  }

  async getDay() {
    const params = {
      date: JSONLoader.testData.weekend.getDay,
    };

    return this.#API.get(JSONLoader.APIEndpoints.dictionary.weekend.getDay, params);
  }

  async getMonth() {
    const params = {
      date: JSONLoader.testData.weekend.getMonth,
    };

    return this.#API.get(JSONLoader.APIEndpoints.dictionary.weekend.getMonth, params);
  }

  async getYear() {
    const params = {
      date: JSONLoader.testData.weekend.getYear,
    };

    return this.#API.get(JSONLoader.APIEndpoints.dictionary.weekend.getYear, params);
  }

  async getPeriod() {
    const params = JSONLoader.testData.weekend.getPeriod;

    return this.#API.get(JSONLoader.APIEndpoints.dictionary.weekend.getPeriod, params);
  }

  async getWorkDay() {
    const params = JSONLoader.testData.weekend.getWorkDay;

    return this.#API.get(JSONLoader.APIEndpoints.dictionary.weekend.getWorkDay, params);
  }

  async getCurrency() {
    const params = {
      date: JSONLoader.testData.getCurrency,
    };

    return this.#API.get(JSONLoader.APIEndpoints.dictionary.getCurrency, params);
  }

  async getPDF() {
    return this.#API.get(JSONLoader.APIEndpoints.dictionary.getPDF);
  }

  async getMKBInfo() {
    return this.#API.get(JSONLoader.APIEndpoints.dictionary.getMKBInfo);
  }

  async getTables() {
    return this.#API.get(JSONLoader.APIEndpoints.dictionary.getTables);
  }

  async getTableFields() {
    const modelName = JSONLoader.testData.testModel;
    const endpoint = JSONLoader.APIEndpoints.dictionary.getTableFields.toString()
      .replace('{modelName}', modelName);

    return this.#API.get(endpoint);
  }

  async getTemplateBody() {
    const productName = JSONLoader.testData.testProduct;
    const endpoint = JSONLoader.APIEndpoints.dictionary.templateBody.toString()
      .replace('{productName}', productName);

    return this.#API.get(endpoint);
  }

  async getAll() {
    const modelName = JSONLoader.testData.testModel;
    const endpoint = JSONLoader.APIEndpoints.dictionary.getAll.toString()
      .replace('{modelName}', modelName);

    return this.#API.get(endpoint);
  }

  async getByFieldValue() {
    const modelName = JSONLoader.testData.testModel;
    const fieldName = JSONLoader.testData.testFieldName;
    const fieldValue = JSONLoader.testData.testFieldValue;
    const endpoint = JSONLoader.APIEndpoints.dictionary.getByFieldValue.toString()
      .replace('{modelName}', modelName)
      .replace('{fieldName}', fieldName)
      .replace('{fieldValue}', fieldValue);

    return this.#API.get(endpoint);
  }

  async createProduct() {
    const modelName = JSONLoader.testData.testModel;
    const params = JSONLoader.testData.dataForCreate;
    params.id_1c = Math.floor(Math.random() * 1000000);
    const endpoint = JSONLoader.APIEndpoints.dictionary.CRUD.create.toString()
      .replace('{modelName}', modelName);

    return this.#API.post(endpoint, params);
  }

  async readProduct(id) {
    const modelName = JSONLoader.testData.testModel;
    const endpoint = JSONLoader.APIEndpoints.dictionary.CRUD.read.toString()
      .replace('{modelName}', modelName)
      .replace('{id}', id);

    return this.#API.get(endpoint);
  }

  async updateProduct(id) {
    const modelName = JSONLoader.testData.testModel;
    const params = JSONLoader.testData.dataForUpdate;
    const endpoint = JSONLoader.APIEndpoints.dictionary.CRUD.update.toString()
      .replace('{modelName}', modelName)
      .replace('{id}', id);

    return this.#API.put(endpoint, params);
  }

  async deleteProduct(id) { //
    const modelName = JSONLoader.testData.testModel;
    const endpoint = JSONLoader.APIEndpoints.dictionary.CRUD.delete.toString()
      .replace('{modelName}', modelName)
      .replace('{id}', id);

    return this.#API.delete(endpoint);
  }

  async getWithChildren() {
    const endpoint = JSONLoader.APIEndpoints.dictionary.getForQuery
      + JSONLoader.testData.childrenQuery;

    return this.#API.get(endpoint);
  }

  async getWithQuery() {
    const endpoint = JSONLoader.APIEndpoints.dictionary.getForQuery
      + JSONLoader.testData.query;

    return this.#API.get(endpoint);
  }
}

module.exports = new DictionaryAPI();
