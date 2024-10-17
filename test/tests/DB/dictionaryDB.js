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
    await this.sqlQuery("DELETE FROM products WHERE title = 'test_product';");
  }
}

module.exports = new DictionaryDB();
