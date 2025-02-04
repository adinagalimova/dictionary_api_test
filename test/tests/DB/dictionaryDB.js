const path = require('path');
const BaseDB = require('../../main/utils/DB/baseDB');
require('dotenv').config({ path: path.join(__dirname, '../../../', '.env.test'), override: true });

class DictionaryDB extends BaseDB {
  constructor() {
    super(
      process.env.DB_HOST,
      process.env.DB_USERNAME,
      process.env.DB_PASSWORD,
      process.env.DB_DICTIONARY_DATABASE,
      process.env.DB_PORT,
    );
  }

  async deleteTestData() {
    const target = 'test_product';
    await this.sqlDelete(
      target,
      'products',
      'WHERE `title` = ?',
      [target],
    );
  }
}

module.exports = new DictionaryDB();
