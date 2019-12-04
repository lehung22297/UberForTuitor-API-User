var db = require("../utils/connectDB");

module.exports = {
    getDistrictsByCity: cityId => {
        return db.load(`select * from district where cityId = "${cityId}"`);
    },
}