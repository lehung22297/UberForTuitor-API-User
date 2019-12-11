var db = require("../utils/connectDB");

module.exports = {
  getListAcc: () => {
    return db.load("select * from account where adLock = 1");
  },

  createAcc: account => {
    return db.add("account", account);
  },

  updateAcc: account => {
    return db.update("account", "userId", account);
  },

  getAccByEmailRegister: email => {
    return db.load(`select * from account where gmail= '${email}' and categoryUser != '2' and state= '1'`);
  },

  getAccByEmail: email => {
    return db.load(`select * from account where gmail= '${email}' and adLock = '1'`);
  },

  getAccById: id => {
    return db.load(`select * from account where userId = '${id}' and  adLock=1 `);
  },

  getListTeaching: () => {
    return db.load(`select * from account where categoryUser = 1 and adLock=1`);
  },

  getDetailTeacher: id => {
    return db.load(`select * from account where userId = '${id}' and adLock=1`);
  },

  getListSkill: ()=> {
    return db.load('select * from skill');
  },

  //
  getTopTeacher: () => {
    return db.load('select * from account where categoryUser=1 ORDER BY rateSuccess DESC LIMIT 4');
  },

  getTopSixTeacher: () => {
    return db.load('select * from account where categoryUser=1 ORDER BY rateSuccess DESC LIMIT 6');
  },

  getTeacherByPrice: (min,max) => {
    return null;
  },

  getTeacherIncreaseByRateSuccess:()=>{
    return {};
  },

  getTeacherByPriceIncrease:()=>{
    return db.load('select * from account where categoryUser=1 ORDER BY price ASC');
  },

  getTeacherByPriceDecrease:()=>{
    return db.load('select * from account where categoryUser=1 ORDER BY price DESC');
  },

  getTeacherDecreaseByRateSuccess:()=>{
    return {};
  },

  getTeacherRateSuccessDecrease: () => {
    return db.load('select * from account where categoryUser=1 ORDER BY rateSuccess DESC')
  },

  getTeacherByMinPrice: () => {
    return db.load('select * from account where categoryUser=1 and price < 100000')
  },

  getTeacherByMiddlePrice: () => {
    return db.load('select * from account where categoryUser=1 and price > 100000 and price < 500000')
  },

  getTeacherByMaxPrice: () => {
    return db.load('select * from account where categoryUser=1 and price > 500000')
  },

  getTeachersByOneStart: () => {
    return db.load('select * from account where categoryUser=1 and rateSuccess <= 20 and rateSuccess > 0')
 
  },

  getTeachersByTwoStart: () => {
    return db.load('select * from account where categoryUser=1 and rateSuccess > 20 and rateSuccess <= 40')
    
  },

  getTeachersByThreeStart: () => {
    return db.load('select * from account where categoryUser=1 and rateSuccess > 40 and rateSuccess <= 60')
    
  },

  getTeachersByFourStart: () => {
    return db.load('select * from account where categoryUser=1 and rateSuccess > 60 and rateSuccess <= 80')
    
  },
  getTeachersByFiveStart: () => {
    return db.load('select * from account where categoryUser=1 and rateSuccess > 80 and rateSuccess <= 100')
    
  },

  getTeacherByDistrict: (id) => {
    return db.load(`select * from account where categoryUser=1 and districtId="${id}"`)
  }

 
  

  

};
