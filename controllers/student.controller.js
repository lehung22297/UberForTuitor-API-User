const db = require("../model/account.model");
const dbSkill_teacher = require("../model/skill_teacher.model");

module.exports = {
    updateInforStudent: (req, res) => {
        var gmail = req.body.gmail;
        return db.getAccByEmail(gmail).then(user => {
          let entity = {
            userId: user[0].userId,
            avatar: req.body.avatar,
            name: req.body.name,
            gender: req.body.gender,
            districtId: req.body.districtId,    
          };
            db.updateAcc(entity)
            .then(id => res.status(200).json({ message: "Cập nhật thành công" }))
            .catch(err =>
              res.status(400).json({ message: "Cập nhật thất bại", err: err })
            );
        });
      },
}