const fs = require('fs');
const JSONMapper = require('./JSONMapper');
const JSONLoader = require('./JSONLoader');

class DataUtils {
  static saveToJSON(obj) {
    const [name] = Object.keys(obj);
    const data = obj[name];
    const replacer = (key, value) => (typeof value === 'undefined' ? null : value);
    fs.writeFileSync(`./test/artifacts/${name}.json`, JSON.stringify(data, replacer, 4));
  }

  static passBugsTWB(mappedData, getPolicyData) {
    const outputData = { ...mappedData };
    // Pass TWB bug with "doc_number" whitespaces
    const docNumberFullKeys = JSONMapper.getNestedProperty(outputData, 'doc_number').keys;
    docNumberFullKeys.forEach((fullKey) => {
      outputData[fullKey] = /\s/.test(JSONMapper.flattenJSON(getPolicyData)[fullKey])
        ? outputData[fullKey].replace(new RegExp(JSONLoader.testData.docNumberOnesRegexPattern, 'g'), ' ')
        : outputData[fullKey];
    });

    // Pass TWB bug with "doc_gived_by" value
    const docGivedByFullKeys = JSONMapper.getNestedProperty(outputData, 'doc_gived_by').keys;
    docGivedByFullKeys.forEach((fullKey) => {
      if (JSONMapper.flattenJSON(getPolicyData)[fullKey] === 'МВД РК'
      || JSONMapper.flattenJSON(getPolicyData)[fullKey] === '-') {
        outputData[fullKey] = JSONMapper.flattenJSON(getPolicyData)[fullKey];
      }
    });

    // Pass TWB bug with "verify_bool" value without verification
    if (getPolicyData.contracts[0].verify_bool === 1
    && outputData['contracts.0.verify_bool'] === 0) {
      outputData['contracts.0.verify_bool'] = getPolicyData.contracts[0].verify_bool;
    }

    return outputData;
  }

  static mapRequestToOnes(getPolicyData, requestData, optionalSchema) {
    this.saveToJSON({ getPolicyData });
    let mappedData = JSONMapper.mapValues(
      { getPolicyData },
      { requestData },
      optionalSchema ?? JSONLoader.requestToGetPolicyMapSchema,
    );

    mappedData = this.passBugsTWB(mappedData, getPolicyData);
    const requestToOnesMappedData = JSONMapper.unflattenJSON(mappedData);
    this.saveToJSON({ requestData });
    this.saveToJSON({ requestToOnesMappedData });
    return requestToOnesMappedData;
  }

  static mapESBDToOnes(
    getPolicyData,
    getContractByNumberData,
    holderGetClientByIDData,
    insuredGetClientByIDData,
    requestData,
  ) {
    this.saveToJSON({ getPolicyData });
    const { getContractByNumberToGetPolicyMapSchema } = JSONLoader;
    if (requestData.online) getContractByNumberToGetPolicyMapSchema.online_bool = 'online_bool';
    const firstMappedPart = JSONMapper.mapValues(
      { getPolicyData },
      { holderGetClientByIDData },
      JSONLoader.holderGetClientByIDToGetPolicyMapSchema,
    );

    const secondMappedPart = JSONMapper.mapValues(
      { getPolicyData },
      { insuredGetClientByIDData },
      JSONLoader.insuredGetClientByIDToGetPolicyMapSchema,
    );

    const thirdMappedPart = JSONMapper.mapValues(
      { getPolicyData },
      { getContractByNumberData },
      getContractByNumberToGetPolicyMapSchema,
    );

    let mappedData = JSONMapper.safeMergeObjects(
      { firstMappedPart },
      { secondMappedPart },
      { thirdMappedPart },
    );

    mappedData = this.passBugsTWB(mappedData, getPolicyData);
    const rewritedData = JSONMapper.rewriteValues(
      mappedData,
      JSONLoader.dictOnes,
      JSONLoader.dictESBD,
    );

    const ESBDToOnesMappedData = JSONMapper.unflattenJSON(rewritedData);
    this.saveToJSON({ ESBDToOnesMappedData });
    this.saveToJSON({ holderGetClientByIDData });
    this.saveToJSON({ insuredGetClientByIDData });
    this.saveToJSON({ getContractByNumberData });
    return ESBDToOnesMappedData;
  }

  static filterClients(clients, options = {}) {
    const { isResident } = options;
    const { hasPassport } = options;
    const { hasDriverLicence } = options;
    let filteredClients = [...clients];

    filteredClients = filteredClients.filter((client) => {
      if (isResident !== undefined) {
        return isResident ? client.resident_bool : !client.resident_bool;
      }

      return true;
    });

    filteredClients = filteredClients.filter((client) => {
      if (hasDriverLicence !== undefined) {
        return hasDriverLicence ? client.driving_license : !client.driving_license;
      }

      return true;
    });

    filteredClients = filteredClients.filter((client) => {
      if (hasPassport !== undefined) {
        return hasPassport ? client.document_type_id === 2 : client.document_type_id !== 2;
      }

      return true;
    });

    return filteredClients;
  }
}

module.exports = DataUtils;
