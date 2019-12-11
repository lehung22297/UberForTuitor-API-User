var db = require("../utils/connectDB");

module.exports = {
    getDistrictsByCity: cityId => {
        return db.load(`select * from district where cityId = "${cityId}"`);
    },

    getListCity: () => {
        return db.load("select * from city")
    },

    getListDistrict: () => {
        return db.load("select * from district")
    },

    getCityByDistrict: id => {
        return db.load (`SELECT ct.* FROM city as ct JOIN district as dt on ct.cityId = dt.cityId where dt.districtId = "${id}" `)
    }
}