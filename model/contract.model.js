var db = require("../utils/connectDB");

module.exports = {
  isCheck : (i, arrays) => {
    for(let j = 0; j < arrays.length; j +=1){
      const a = parseInt(arrays[j].month);
      if (i ===  a) {
        // check = true
        return arrays[j];
      }
    }
    return false;
  },

  getContractByUser: (idUser, limit, offset) => {
    return db.load(`SELECT * FROM 
    (SELECT new2.*, st.name as Status from
      (select new.*, acc2.name as TeacherName, acc2.avatar as teacherAvatar from
        (select ct.*, acc.name as StudentName, acc.avatar as studentAvatar from contract as ct
          JOIN account as acc on ct.studentId = acc.userId)
          as new JOIN account as acc2 ON new.teacherId = acc2.userId)
          as new2 JOIN state_contract as st on st.id = new2.state)
          as bb WHERE bb.studentId="${idUser}" LIMIT ${limit} OFFSET ${offset}`);
  },


  getCountUserLimit: idUser => {
    return db.load(`SELECT COUNT(*) as sumT FROM (SELECT * FROM 
      (SELECT new2.*, st.name as Status from (select new.*, acc2.name as TeacherName from 
        (select ct.*, acc.name as StudentName from contract as ct JOIN account as acc on ct.studentId = acc.userId) 
        as new JOIN account as acc2 ON new.teacherId = acc2.userId) as new2 JOIN state_contract as st on st.id = new2.state) 
        as bb WHERE bb.studentId="${idUser}") as tb`)
  },


  getContractByTeacher: (idUser, limit, offset) => {
    return db.load(`SELECT * FROM 
    (SELECT new2.*, st.name as Status from 
      (select new.*, acc2.name as TeacherName, acc2.avatar as teacherAvatar from 
        (select ct.*, acc.name as StudentName, 
          acc.avatar as studentAvatar from contract as ct JOIN account as acc on ct.studentId = acc.userId) 
          as new JOIN account as acc2 ON new.teacherId = acc2.userId) 
          as new2 JOIN state_contract as st on st.id = new2.state) as bb WHERE bb.teacherId="${idUser}" 
          LIMIT ${limit} OFFSET ${offset}`);
  },

  getCountTeacherLimit: idUser => {
    return db.load(`SELECT COUNT(*) as sumT FROM (SELECT * FROM 
      (SELECT new2.*, st.name as Status from (select new.*, acc2.name as TeacherName from 
        (select ct.*, acc.name as StudentName from contract as ct JOIN account as acc on ct.studentId = acc.userId) 
        as new JOIN account as acc2 ON new.teacherId = acc2.userId) as new2 JOIN state_contract as st on st.id = new2.state) 
        as bb WHERE bb.teacherId="${idUser}") as tb`)
  },

  getAllContract: () => {
    return db.load(`SELECT new2.*, st.name as Status from 
    (select new.*, acc2.name as TeacherName from 
      (select ct.*, acc.name as StudentName from contract as ct JOIN account as acc on ct.studentId = acc.userId) as new 
      JOIN account as acc2 ON new.teacherId = acc2.userId) as new2 JOIN state_contract as st on st.id = new2.state`);
  },

  createContract: (contract) => {
    return db.add("contract", contract);
  },

  filterListContractStudent: (idUser, idState, limit, offset) => {
    return db.load(`SELECT * FROM 
    (SELECT new2.*, st.name as Status from (select new.*, acc2.name as TeacherName, acc2.avatar as teacherAvatar from 
      (select ct.*, acc.name as StudentName, 
        acc.avatar as studentAvatar from contract as ct JOIN account as acc on ct.studentId = acc.userId) 
      as new JOIN account as acc2 ON new.teacherId = acc2.userId) as new2 JOIN state_contract as st on st.id = new2.state) 
      as bb WHERE bb.studentId="${idUser}" AND bb.state="${idState}" LIMIT ${limit}  OFFSET ${offset}`)
  },

  getCountStudentLimit: (idUser, idState) => {
    return db.load(`SELECT COUNT(*) as sumT FROM (SELECT * FROM 
      (SELECT new2.*, st.name as Status from (select new.*, acc2.name as TeacherName, acc2.avatar as teacherAvatar from 
        (select ct.*, acc.name as StudentName, 
          acc.avatar as studentAvatar from contract as ct JOIN account as acc on ct.studentId = acc.userId) 
        as new JOIN account as acc2 ON new.teacherId = acc2.userId) as new2 JOIN state_contract as st on st.id = new2.state) 
        as bb WHERE bb.studentId="${idUser}" AND bb.state="${idState}") as tb`)
  },

  filterListContractTeacher: (idUser, idState, limit, offset) => {
    return db.load(`SELECT * FROM 
    (SELECT new2.*, st.name as Status from (select new.*, acc2.name as TeacherName, acc2.avatar as teacherAvatar from 
      (select ct.*, acc.name as StudentName,
        acc.avatar as studentAvatar from contract as ct JOIN account as acc on ct.studentId = acc.userId) 
      as new JOIN account as acc2 ON new.teacherId = acc2.userId) as new2 JOIN state_contract as st on st.id = new2.state) 
      as bb WHERE bb.teacherId="${idUser}" AND bb.state="${idState}" LIMIT ${limit}  OFFSET ${offset}`)
  },

  getCountTeacherLimitByState: (idUser, idState) => {
    return db.load(`SELECT COUNT(*) as sumT FROM (SELECT * FROM 
      (SELECT new2.*, st.name as Status from (select new.*, acc2.name as TeacherName, acc2.avatar as teacherAvatar from 
        (select ct.*, acc.name as StudentName, 
          acc.avatar as studentAvatar from contract as ct JOIN account as acc on ct.studentId = acc.userId) 
        as new JOIN account as acc2 ON new.teacherId = acc2.userId) as new2 JOIN state_contract as st on st.id = new2.state) 
        as bb WHERE bb.teacherId="${idUser}" AND bb.state="${idState}") as tb`)
  },

  getSumPriceByDate: (isTeacher, date) => {
    return db.load(`SELECT  SUM(ct.price) as sumPrice, ct.endDay FROM contract as ct WHERE ct.teacherId = ${isTeacher} AND ct.state=3 AND ct.endDay="${date}"`)
  },

  getMaxPriceByIdTeacher: (isTeacher) => {
    return db.load(`SELECT MAX(ct.price) as maxPrice, ct.endDay FROM contract as ct WHERE ct.teacherId = ${isTeacher} AND ct.state=3`)
  },


  detailContract: (id) => {
    return db.load(`SELECT * FROM contract WHERE idContract = ${id}`)
  },

  getSkillByContract: (id) => {
    return db.load(`SELECT * FROM skill_contract as sc JOIN skill as sk on sc.idSkill = sk.skillId where sc.idContract = ${id}`)
  },

  updateStateContract: (contract) => {
    return db.update("contract", "idContract", contract);
  },

  getTotalContracts: (idTeacher, date) => {
    return db.load(`SELECT COUNT(*) as totalContracts, endDay FROM contract WHERE teacherId = ${idTeacher} and endDay = '${date}' and state = 3`);
  },
  // lay tong doanh thu tung thang theo nam
  sumPriceEachMonthByYear: (idTeacher, year) => {
    return db.load(`SELECT SUM(price) as sum,
     SUBSTRING(endDay, 4, 2) as month FROM contract WHERE teacherId = ${idTeacher} 
     and state = 3 AND SUBSTRING(endDay, 7, 4) = ${year} 
     GROUP BY SUBSTRING(endDay, 4, 2) ORDER BY month ASC`);
  },


  sumPriceByYear: (id,year) => {
    return db.load(`SELECT COUNT(*) as numberContract, SUM(price) as sumPrice, SUBSTRING(endDay, 7, 4) as year FROM contract WHERE teacherId = ${id} and state = 3 AND SUBSTRING(endDay, 7, 4) = ${year} GROUP by SUBSTRING(endDay, 7, 4)`)
  }
};
