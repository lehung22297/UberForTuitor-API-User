const db = require("../model/comment.model");
const db_contract = require("../model/contract.model");

module.exports = {
  createComment: (req, res) => {
    const comment = {
      content: req.body.content,
      starNumber: req.body.starNumber,
      idUser: req.body.idUser,
      idTeacher: req.body.idTeacher,
      idContract: req.body.idContract
    };
    db.createComment(comment)
      .then(index => {
        if (index != 0) {
          const contract = {
            idContract: req.body.idContract,
            isDanhGia: 1
          };
          db_contract.updateStateContract(contract);
          res.status(200).json({ message: "Thêm thành công" });
        } else {
          res.status(400).json({ message: "Thất bại" });
        }
      })
      .catch(e => {
        res.status(400).json({ message: "Thất bại" });
      });
  },

  createComplaint: (req, res) => {
    const complaint = {
      reason: req.body.reason,
      contractId: req.body.contractId,
      isDone: 0
    };
    console.log(complaint);
    db.createComplaint(complaint)
      .then(index => {
        if (index != 0) {
          const contract = {
            idContract: req.body.contractId,
            state: 5
          };

          db_contract.updateStateContract(contract).then(() => {
            res
              .status(200)
              .json({
                message: "Thêm khiếu nại thành công và cập nhật state hợp đồng"
              });
          });

        } else {
          res.status(400).json({ message: "Thất bại" });
        }
      })
      .catch(e => {
        res.status(400).json({ message: "Thất bại" });
      });
  },

  getComplaintByUser: (req, res) => {
    // let id = req.params.id;
    // return db
    //   .getContractByUser(id)
    //   .then(contract => {
    //     if (contract.length > 0) {
    //       res.status(200).json(contract);
    //     } else {
    //       res.status(400).json({ message: "Hợp đồng không tồn tại" });
    //     }
    //   })
    //   .catch(err =>
    //     res.status(400).json({ message: "Hợp đồng không tồn tại", error: err })
    //   );
  },
  getComplaintByContract: (req, res) => {
    const id = req.params.id;
    return db.getComplaintByContract(id)
      .then(complaint => {
        if (complaint.length > 0) {
          res.status(200).json(complaint);
        } else {
          res.status(400).json({ message: "Hợp đồng không tồn tại" });
        }
      })
      .catch(err =>
        res.status(400).json({ message: "Hợp đồng không tồn tại", error: err })
      );
  }

  
};
