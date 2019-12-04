const db = require("../model/district.model");

module.exports = {
  get_list_districts: async (req, res) => {
    let cityId = req.body.cityId;
    return await db
      .getDistrictsByCity(cityId)
      .then(districts => {
        if (districts.length > 0) {
          res.status(200).json(districts);
        } else {
          res.status(400).json({ message: "Thành phố không tồn tại" });
        }
      })
      .catch(err =>
        res.status(400).json({ message: "Thành phố không tồn tại", error: err })
      );
  }
};
