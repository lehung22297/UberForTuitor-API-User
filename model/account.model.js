var db = require("../utils/connectDB");

module.exports = {
  getListAcc: () => {
    return db.load("select * from account");
  },

  createAcc: account => {
    return db.add("account", account);
  },

  updateAcc: account => {
    return db.update("account", "userId", account);
  },

  getAccByEmailRegister: email => {
    return db.load(`select * from account where gmail= '${email}' and categoryUser != '2' and state= '1'`);
  },

  getAccByEmail: email => {
    return db.load(`select * from account where gmail= '${email}'`);
  },

  getAccById: id => {
    return db.load(`select * from account where userId = '${id}' `);
  }
};
