const path = require('path');
const moment = require('moment');
const authAPI = require('./authAPI');
const dictionaryAPI = require('./dictionaryAPI');
const BaseAPI = require('../../main/utils/API/baseAPI');
const JSONLoader = require('../../main/utils/data/JSONLoader');
const DataUtils = require('../../main/utils/data/dataUtils');
require('dotenv').config({ path: path.join(__dirname, '../../../', '.env.test'), override: true });

class MSTAPI extends BaseAPI {
  #API;

  #user;

  #options;

  constructor(options = {
    baseURL: '' || process.env.GATEWAY_URL,
  }) {
    super(options);
    this.#options = options;
  }

  async setToken() {
    this.#user = await authAPI.getTestUser();
    const response = await authAPI.auth({ user: this.#user, APIName: 'MST API' });
    this.#options.headers = {};
    this.#options.headers.Authorization = `Bearer ${response.data.data.access_token}`;
    this.#API = new MSTAPI(this.#options);
  }

  async setPolicy() {
    const params = JSONLoader.templateSetPolicy;
    const datesInterval = this
      .getRandomDatesIntervalFromTomorrow(...JSONLoader.testData.timeIncrement);
    params.date_begin = datesInterval.startDate;
    params.date_end = datesInterval.finishDate;
    params.request_number = this.getRandomString(false, false, true, false, false, 20, 20);
    const externalID = this.getRandomString(false, false, true, false, false, 10, 10);
    const amountSum = JSONLoader.testData.amountSums[this.getRandomInteger(3)];
    const pdl = this.getRandomInteger(1);
    params.holders[0].external_id = externalID;
    params.holders[1].external_id = externalID;
    params.holders[0].amount_sum = amountSum;
    params.holders[1].amount_sum = amountSum;
    params.holders[0].pdl = pdl;
    params.holders[1].pdl = pdl;
    params.online = Number(!this.#user.login.includes('tugelbassov'));

    let testClients = (await dictionaryAPI.fetchAllTestClients()).data;
    testClients = DataUtils.filterClients(testClients);
    const randomInsuredIndex = Randomizer.getRandomInteger(testClients.length - 1);
    let randomHolderIndex;
    do {
      randomHolderIndex = Randomizer.getRandomInteger(testClients.length - 1);
    } while (randomHolderIndex === randomInsuredIndex);

    params.holders[0].born = moment(testClients[randomInsuredIndex].born)
      .format(JSONLoader.testData.datesFormat);
    params.holders[0].document_gived_date = moment(testClients[randomInsuredIndex]
      .document_gived_date).format(JSONLoader.testData.datesFormat);
    params.holders[0].document_number = testClients[randomInsuredIndex].document_number;
    params.holders[0].document_type_id = testClients[randomInsuredIndex].document_type_id;
    params.holders[0].first_name = testClients[randomInsuredIndex].first_name;
    params.holders[0].iin = testClients[randomInsuredIndex].iin.toString();
    params.holders[0].last_name = testClients[randomInsuredIndex].last_name;
    params.holders[0].middle_name = testClients[randomInsuredIndex].middle_name;
    params.holders[0].resident_bool = testClients[randomInsuredIndex].resident_bool;
    params.holders[0].sex_id = testClients[randomInsuredIndex].sex_id;
    params.holders[0].first_name_eng = testClients[randomInsuredIndex].first_name_eng;
    params.holders[0].last_name_eng = testClients[randomInsuredIndex].last_name_eng;

    params.holders[1].born = moment(testClients[randomHolderIndex].born)
      .format(JSONLoader.testData.datesFormat);
    params.holders[1].document_gived_date = moment(testClients[randomHolderIndex]
      .document_gived_date).format(JSONLoader.testData.datesFormat);
    params.holders[1].document_number = testClients[randomHolderIndex].document_number;
    params.holders[1].document_type_id = testClients[randomHolderIndex].document_type_id;
    params.holders[1].first_name = testClients[randomHolderIndex].first_name;
    params.holders[1].iin = testClients[randomHolderIndex].iin.toString();
    params.holders[1].last_name = testClients[randomHolderIndex].last_name;
    params.holders[1].middle_name = testClients[randomHolderIndex].middle_name;
    params.holders[1].resident_bool = testClients[randomHolderIndex].resident_bool;
    params.holders[1].sex_id = testClients[randomHolderIndex].sex_id;
    params.holders[1].first_name_eng = testClients[randomHolderIndex].first_name_eng;
    params.holders[1].last_name_eng = testClients[randomHolderIndex].last_name_eng;

    const response = await this.#API.post(JSONLoader.APIEndpoints.MST.setPolicy, params);

    return { requestBody: params, response };
  }
}

module.exports = new MSTAPI();
