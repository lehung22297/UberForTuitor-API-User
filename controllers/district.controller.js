const db = require("../model/district.model");

module.exports = {
  get_list_districts: async (req, res) => {
    let cityId = req.params.id;
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
  },

  getListCIty: async (req, res) => {
    return await db
      .getListCity()
      .then(list => {
        res.status(200).json(list);
      })
      .catch(err => {
        res.status(400).json({ message: "Thất bại", err: err });
      });
  },

  getListDistrict: async(req,res)=> {
    return db
    .getListDistrict()
    .then(list => {
      res.status(200).json(list);
    })
    .catch(err => {
      res.status(400).json({ message: "Thất bại", err: err });
    });
  },

  //lấy thành phố theo quận
  getCityByDistrict: async(req,res) => {
    const id = req.params.id;
    return await db.getCityByDistrict(id).then(result => {
      res.status(200).json(result[0]);
    }).catch(err => {
      res.status(400).send({ message: "Thất bại", err: err });
    });
  }
};
