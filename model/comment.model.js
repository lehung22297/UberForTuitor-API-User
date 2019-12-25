var db = require("../utils/connectDB");

module.exports = {
  commentsByUserTeacher: id => {
    return db.load(
      `SELECT * FROM comment as cm JOIN account as std on cm.idUser = std.userId where cm.idTeacher = ${id}`
    );
  },

  createComment: entity => {
    return db.add("comment", entity);
  },

  createComplaint: entity => {
    return db.add("complaint", entity);
  },

  getComplaintByUser: (id) => {
    return db.load('select * from complaint where ')
  },

  getComplaintByContract: (id) => {
    return db.load(`select * from complaint where contractId = ${id} `)

  }
};
