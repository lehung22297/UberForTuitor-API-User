const db = require("../model/contract.model");
const dbSkill_teacher = require("../model/skill_teacher.model");
const moment = require('moment');
const numeral = require('numeral');



module.exports = {
  getContractByUser: (req, res) => {
    let id = req.params.id;
    var page = req.query.page || 1;
    var limit = 4;
    if (page < 1) page = 1;
    var offset = (page - 1) * limit;
    Promise.all([
      db.getCountUserLimit(id),
      db.getContractByUser(id, limit, offset)
    ]).then(([sumHistory, limitHistory]) => {
      var numberPages = parseInt(sumHistory[0].sumT / limit);
      if (sumHistory[0].sumT % limit > 0) numberPages += 1;
      res.status(200).json({ numberPages, limitHistory, offset, page });
    });
  },

  // getContractByUser: async (req, res) => {
  //   let id = req.params.id;
  //   return await db
  //     .getContractByUser(id)
  //     .then(contract => {
  //       if (contract.length > 0) {
  //         res.status(200).json(contract);
  //       } else {
  //         res.status(400).json({ message: "Hợp đồng không tồn tại" });
  //       }
  //     })
  //     .catch(err =>
  //       res.status(400).json({ message: "Hợp đồng không tồn tại", error: err })
  //     );
  // },

  getContractByTeacher: async (req, res) => {
    let id = req.params.id;
    var page = req.query.page || 1;
    var limit = 4;
    if (page < 1) page = 1;
    var offset = (page - 1) * limit;
    Promise.all([
      db.getCountTeacherLimit(id),
      db.getContractByTeacher(id, limit, offset)
    ]).then(([sumHistory, limitHistory]) => {
      var numberPages = parseInt(sumHistory[0].sumT / limit);
      if (sumHistory[0].sumT % limit > 0) numberPages += 1;
      res.status(200).json({ numberPages, limitHistory, offset, page });
    });
  },


  getAllContract: (req, res) => {
    return db
      .getAllContract()
      .then(contract => {
        if (contract.length > 0) {
          res.status(200).json(contract);
        } else {
          res.status(400).json({ message: "Hợp đồng không tồn tại" });
        }
      })
      .catch(err =>
        res.status(400).json({ message: "Hợp đồng không tồn tại", error: err })
      );
  },

  createContract: (req, res) => {
    console.log(req.body);
    let skills = req.body.skill;
    var listSkill = skills.toString().split(",");
    let contract = {
      teacherId: req.body.teacherId,
      studentId: req.body.studentId,
      price: req.body.price,
      startDay: req.body.startDay,
      endDay: req.body.endDay,
      dateCreate: req.body.dateCreate,
      numberDay: req.body.numberDay,
      numberHour: req.body.numberHour,
      state: 1,
      isDanhGia: 0
    };

    return db
      .createContract(contract)
      .then(id => {
        listSkill.forEach(element => {
          let skill_Contract = {
            idContract: id,
            idSkill: element
          };
          dbSkill_teacher.updateSkillContract(skill_Contract);
        });
      })
      .then(id => {
        res.status(200).json({ status: "200" });
      })
      .catch(error => res.status(400).send(error));
  },

  filterListContractStudent: (req, res) => {
    const idUser = req.params.idUser;
    const idState = req.query.idState;
    var page = req.query.page || 1;
    var limit = 4;
    if (page < 1) page = 1;
    var offset = (page - 1) * limit;
    Promise.all([
      db.getCountStudentLimit(idUser, idState),
      db.filterListContractStudent(idUser, idState, limit, offset)
    ]).then(([sumHistory, limitHistory]) => {
      var numberPages = parseInt(sumHistory[0].sumT / limit);
      if (sumHistory[0].sumT % limit > 0) numberPages += 1;
      res.status(200).json({ numberPages, limitHistory, offset, page });
    });
  },

  filterListContractTeacher: (req, res) => {
    const idUser = req.params.idUser;
    const idState = req.query.idState;
    var page = req.query.page || 1;
    console.log('page', req.query.page);
    var limit = 4;
    if (page < 1) page = 1;
    var offset = (page - 1) * limit;
    Promise.all([
      db.getCountTeacherLimitByState(idUser, idState),
      db.filterListContractTeacher(idUser, idState, limit, offset)
    ]).then(([sumHistory, limitHistory]) => {
      var numberPages = parseInt(sumHistory[0].sumT / limit);
      if (sumHistory[0].sumT % limit > 0) numberPages += 1;
      res.status(200).json({ numberPages, limitHistory, offset, page });
    });
  },

  detailContract: (req, res) => {
    let id = req.params.id;
    return Promise.all([db.detailContract(id), db.getSkillByContract(id)])
      .then(([detailContract, skills]) => {
        if (detailContract.length > 0) {
          res.status(200).json({ detailContract, skills });
        } else {
          res.status(400).json({ message: "Hợp đồng không tồn tại" });
        }
      })
      .catch(err =>
        res.status(400).json({ message: "Hợp đồng không tồn tại", error: err })
      );
  },

  updateStateContract: (req, res) => {
    let id = req.params.id;
    const state = {
      idContract: id,
      state: req.body.state,
    }
    db.updateStateContract(state).then(id => {
      // trùng state thì k được
      if (id === 1) {
        res.status(200).json({ message: 'Cập nhật trạng thái thành công' });
      }
      else {
        res.status(400).json({ message: 'Cập nhật trạng thái thất bại' });
      }
    })
  },

  getSumPriceByDate: async (req, res) => {
    const id = req.params.id;
    const arrDate = [];
    let maxPrice = 0;
    let minPrice = 0;

    for (let i = 0; i < 7; i += 1) {
      const nowDate = new Date();
      const tempDate = nowDate.setDate(nowDate.getDate() - i)
      const resultDate = moment(tempDate).format('DD-MM-YYYY')
      await db.getSumPriceByDate(id, resultDate.toString()).then(resp => {
        console.log(resp.length);
        if (resp[0].sumPrice === null) {
          const item = {
            "sumPrice": 0,
            "endDay": resultDate,
          }
          arrDate.push(item)
        }
        else {
          if (resp[0].sumPrice > maxPrice) {
            maxPrice = resp[0].sumPrice;
          } else if (resp[0].sumPrice < minPrice) {
            minPrice = resp[0].sumPrice;
          }
          arrDate.push(resp[0]);
        }
      })
    }

    // console.log(maxPrice);
    res.status(200).json({ arrDate, maxPrice, minPrice })
  },

  getTotalContracts: async (req, res) => {
    const id = req.params.idTeacher;
    const arrTotal = [];
    let maxTotal = 0;
    let minTotal = 0;

    for (let i = 0; i < 7; i += 1) {
      const nowDate = new Date();
      const tempDate = nowDate.setDate(nowDate.getDate() - i);
      const resultDate = moment(tempDate).format('DD-MM-YYYY');
      await db.getTotalContracts(id, resultDate.toString()).then(resp => {
        if (resp[0].totalContracts === 0) {
          const item = {
            "totalContracts": 0,
            "endDay": resultDate,
          }
          arrTotal.push(item)
        }
        else {
          if (resp[0].totalContracts > maxTotal) {
            maxTotal = resp[0].totalContracts;
          } else {
            minTotal = resp[0].totalContracts;
          }
          arrTotal.push(resp[0]);
        }
        // console.log('resp', resp);
      })
    }

    // console.log(maxPrice);
    res.status(200).json({ arrTotal, maxTotal, minTotal })
  },


  getSumPriceEachMonthByYear: async (req, res) => {
    const id = req.params.idTeacher;
    const arr = [];
    const nowDate = moment().format();
    const resultDate = moment(nowDate).year();
    await db.sumPriceEachMonthByYear(id, resultDate).then(resp => {
      for (let i = 1; i <= 12; i += 1) {
        if (!db.isCheck(i, resp)) {
          const temp = {
            "sum": 0,
            "month": `${i}`,
          }
          arr.push(temp);
        }
        else {
          const temp = db.isCheck(i, resp);
          console.log('1111111111', temp);
          arr.push(temp);
        }
      }
    })
    res.status(200).json(arr);

  },

  getSumPriceByYear: async (req, res) => {
    const id = req.params.id;
    const nowDate = moment().format();
    const currentYear = moment(nowDate).year();
    const arrYear = [];
    for (let i = 0; i < 7; i += 1) {
      await db.sumPriceByYear(id, currentYear - i).then(resp => {
        console.log(resp);
        if (resp.length === 0) {
          const yearTemp = {
            "numberContract" : 0,
            "sumPrice": 0,
            "year": (currentYear - i).toString(),
          }
          arrYear.push(yearTemp)          
        }
        else {
          arrYear.push(resp[0])
        }
      })
    }
    res.status(200).json({arrYear});

  },

  getPriceAndContract: (req, res) => {
    const id = req.params.id;
    const nowDate = moment().format();
    const currentYear = moment(nowDate).year();
    db.sumPriceByYear(id, currentYear).then(resp => {
      res.status(200).json(resp);
    })
  }
}

