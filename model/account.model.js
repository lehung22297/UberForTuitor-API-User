var db = require("../utils/connectDB");

module.exports = {
  getListAcc: () => {
    return db.load("select DISTINCT 100*(select sum(starNumber) from comment c1 where idTeacher = c.idTeacher)/((SELECT COUNT(*) FROM comment WHERE idTeacher = c.idTeacher)*5) as rateSuccess, a.* from comment c right join account a on c.idTeacher = a.userId where a.categoryUser = 1 and a.price != '' and a.adLock=1");
  },

  createAcc: account => {
    return db.add("account", account);
  },

  updateAcc: account => {
    return db.update("account", "userId", account);
  },

  getAccByEmailRegister: email => {
    return db.load(`select * from account where gmail= '${email}' and categoryUser != '2' and state= '1' and adLock=1`);
  },

  getAccByEmail: email => {
    return db.load(`select * from account where gmail= '${email}' and adLock = '1'`);
  },

  getAccAdminByKeyPass: (keyPass) => {
    return db.load(`select * from account where keyPass="${keyPass}"`);
  },


  getAccById: id => {
    return db.load(`select * from account where userId = '${id}' and  adLock=1 `);
  },

  getListTeaching: () => {
    return db.load(`select DISTINCT 100*(select sum(starNumber) from comment c1 where idTeacher = c.idTeacher)/((SELECT COUNT(*) FROM comment WHERE idTeacher = c.idTeacher)*5) as rateSuccess, a.* from comment c right join account a on c.idTeacher = a.userId where a.categoryUser = 1 and a.price != "" and a.adLock=1`);
  },

  // phân trang
  // getListTeaching: (limit, offset) => {
  //   return db.load(`select DISTINCT 100*(select sum(starNumber) from comment c1 where idTeacher = c.idTeacher)/((SELECT COUNT(*) FROM comment WHERE idTeacher = c.idTeacher)*5) as rateSuccess, a.* from comment c join account a on c.idTeacher = a.userId and a.adLock=1 LIMIT ${limit} OFFSET ${offset}`);
  // },

  // getCountTeaching: () => {
  //   return db.load("select COUNT(*) as sumT from (select DISTINCT 100*(select sum(starNumber) from comment c1 where idTeacher = c.idTeacher)/((SELECT COUNT(*) FROM comment WHERE idTeacher = c.idTeacher)*5) as rateSuccess, a.* from comment c join account a on c.idTeacher = a.userId and a.adLock=1) as tbnew");

  // },

  getDetailTeacher: id => {
    return db.load(`SELECT * FROM account where userId= ${id}`);
  },
  //
  getDetailSingleTeacher: id => {
    return db.load(`select DISTINCT 100*(select sum(starNumber) from comment c1 where idTeacher = c.idTeacher)/((SELECT COUNT(*) FROM comment WHERE idTeacher = c.idTeacher)*5) as rateSuccess, (100*(SELECT Count(*) as sumSuccess FROM contract where state = 3 and teacherId = a.userId)/(SELECT COUNT(*) as sumAll from contract where teacherId = a.userId and (state = 4 || state = 3))) as rateCS, a.* from comment c right join account a on c.idTeacher = a.userId and a.adLock=1 where a.userId = ${id} and a.adLock=1 and a.categoryUser = 1`);
  },
  getDetailStudent: id => {
    return db.load(`select * from account where userId = '${id}' and adLock=1`);
  },

  getListSkill: ()=> {
    return db.load('select * from skill');
  },

  //
  getTopTeacher: () => {
    return db.load('select DISTINCT 100*(select sum(starNumber) from comment c1 where idTeacher = c.idTeacher)/((SELECT COUNT(*) FROM comment WHERE idTeacher = c.idTeacher)*5) as rateSuccess, a.* from comment c right join account a on c.idTeacher = a.userId where a.categoryUser = 1 and a.price != "" and a.adLock=1 ORDER BY rateSuccess DESC LIMIT 4');
  },

  getTopSixTeacher: () => {
    return db.load('select DISTINCT 100*(select sum(starNumber) from comment c1 where idTeacher = c.idTeacher)/((SELECT COUNT(*) FROM comment WHERE idTeacher = c.idTeacher)*5) as rateSuccess, a.* from comment c right join account a on c.idTeacher = a.userId where a.categoryUser = 1 and a.price != "" and a.adLock=1 ORDER BY rateSuccess DESC LIMIT 6');
  },

  getTeacherByPrice: (min,max) => {
    return null;
  },

  getTeacherIncreaseByRateSuccess:()=>{
    return {};
  },

  getTeacherByPriceIncrease:()=>{
    return db.load('select DISTINCT 100*(select sum(starNumber) from comment c1 where idTeacher = c.idTeacher)/((SELECT COUNT(*) FROM comment WHERE idTeacher = c.idTeacher)*5) as rateSuccess, a.* from comment c right join account a on c.idTeacher = a.userId where a.categoryUser = 1 and a.price != "" and a.adLock=1 ORDER BY price ASC');
  },

  getTeacherByPriceDecrease:()=>{
    return db.load('select DISTINCT 100*(select sum(starNumber) from comment c1 where idTeacher = c.idTeacher)/((SELECT COUNT(*) FROM comment WHERE idTeacher = c.idTeacher)*5) as rateSuccess, a.* from comment c right join account a on c.idTeacher = a.userId where a.categoryUser = 1 and a.price != "" and a.adLock=1 ORDER BY price DESC');
  },

  getTeacherDecreaseByRateSuccess:()=>{
    return {};
  },

  getTeacherRateSuccessDecrease: () => {
    return db.load('select DISTINCT 100*(select sum(starNumber) from comment c1 where idTeacher = c.idTeacher)/((SELECT COUNT(*) FROM comment WHERE idTeacher = c.idTeacher)*5) as rateSuccess, a.* from comment c right join account a on c.idTeacher = a.userId where a.categoryUser = 1 and a.price != "" and a.adLock=1 ORDER BY rateSuccess DESC')
  },

  getTeacherByMinPrice: () => {
    return db.load('select DISTINCT 100*(select sum(starNumber) from comment c1 where idTeacher = c.idTeacher)/((SELECT COUNT(*) FROM comment WHERE idTeacher = c.idTeacher)*5) as rateSuccess, a.* from comment c right join account a on c.idTeacher = a.userId where a.categoryUser = 1 and a.price != "" and a.adLock=1 and price < 100000')
  },

  getTeacherByMiddlePrice: () => {
    return db.load('select DISTINCT 100*(select sum(starNumber) from comment c1 where idTeacher = c.idTeacher)/((SELECT COUNT(*) FROM comment WHERE idTeacher = c.idTeacher)*5) as rateSuccess, a.* from comment c right join account a on c.idTeacher = a.userId where a.categoryUser = 1 and a.price != "" and a.adLock=1 and price > 100000 and price < 500000')
  },

  getTeacherByMaxPrice: () => {
    return db.load('select DISTINCT 100*(select sum(starNumber) from comment c1 where idTeacher = c.idTeacher)/((SELECT COUNT(*) FROM comment WHERE idTeacher = c.idTeacher)*5) as rateSuccess, a.* from comment c right join account a on c.idTeacher = a.userId where a.categoryUser = 1 and a.price != "" and a.adLock=1 and price > 500000')
  },

  getTeachersByOneStart: () => {
    return db.load('select * from (select DISTINCT 100*(select sum(starNumber) from comment c1 where idTeacher = c.idTeacher)/((SELECT COUNT(*) FROM comment WHERE idTeacher = c.idTeacher)*5) as rateSuccess, a.* from comment c right join account a on c.idTeacher = a.userId where a.categoryUser = 1 and a.price != "" and a.adLock=1 ) as t where t.rateSuccess <= 20  and t.rateSuccess > 0')
 
  },

  getTeachersByTwoStart: () => {
    return db.load('select * from (select DISTINCT 100*(select sum(starNumber) from comment c1 where idTeacher = c.idTeacher)/((SELECT COUNT(*) FROM comment WHERE idTeacher = c.idTeacher)*5) as rateSuccess, a.* from comment c right join account a on c.idTeacher = a.userId where a.categoryUser = 1 and a.price != "" and a.adLock=1 ) as t where t.rateSuccess > 20 and t.rateSuccess <= 40')
    
  },

  getTeachersByThreeStart: () => {
    return db.load('select * from (select DISTINCT 100*(select sum(starNumber) from comment c1 where idTeacher = c.idTeacher)/((SELECT COUNT(*) FROM comment WHERE idTeacher = c.idTeacher)*5) as rateSuccess, a.* from comment c right join account a on c.idTeacher = a.userId where a.categoryUser = 1 and a.price != "" and a.adLock=1 ) as t where t.rateSuccess > 40 and t.rateSuccess <= 60')
    
  },

  getTeachersByFourStart: () => {
    return db.load('select * from (select DISTINCT 100*(select sum(starNumber) from comment c1 where idTeacher = c.idTeacher)/((SELECT COUNT(*) FROM comment WHERE idTeacher = c.idTeacher)*5) as rateSuccess, a.* from comment c right join account a on c.idTeacher = a.userId where a.categoryUser = 1 and a.price != "" and a.adLock=1 ) as t where t.rateSuccess > 60 and t.rateSuccess <= 80')
    
  },
  getTeachersByFiveStart: () => {
    return db.load('select * from (select DISTINCT 100*(select sum(starNumber) from comment c1 where idTeacher = c.idTeacher)/((SELECT COUNT(*) FROM comment WHERE idTeacher = c.idTeacher)*5) as rateSuccess, a.* from comment c right join account a on c.idTeacher = a.userId where a.categoryUser = 1 and a.price != "" and a.adLock=1 ) as t where t.rateSuccess > 80 and t.rateSuccess <= 100')
    
  },

  getTeacherByDistrict: (id) => {
    return db.load(`select DISTINCT 100*(select sum(starNumber) from comment c1 where idTeacher = c.idTeacher)/((SELECT COUNT(*) FROM comment WHERE idTeacher = c.idTeacher)*5) as rateSuccess, a.* from comment c right join account a on c.idTeacher = a.userId where a.categoryUser = 1 and a.price != '' and a.adLock=1 and districtId="${id}"`)
  },

  //
  getCommentByUser: (id) => {
    return db.load (`SELECT cm.* from comment as cm JOIN account as ac on cm.idTeacher = ac.userId WHERE ac.categoryUser = 1 and ac.userId = "${id}"`);
  },

  getStudentByComment: (id) => {
    return db.load(`SELECT ac.* from comment as cm JOIN account as ac on cm.idTeacher = ac.userId where cm.idCmt = ${id}`)
  },

  getTeacherBySkill: (id) => {
    return db.load(`select * from (select DISTINCT 100*(select sum(starNumber) from comment c1 where idTeacher = c.idTeacher)/((SELECT COUNT(*) FROM comment WHERE idTeacher = c.idTeacher)*5) as rateSuccess, a.* from comment c join account a on c.idTeacher = a.userId and a.adLock=1) as ac JoiN skill_teacher as st ON st.userId = ac.userId where st.skillId = ${id} `)
  }

};
