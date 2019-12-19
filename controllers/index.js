const registerController = require('./register.controller');
const loginController = require('./login.controller');
const districtController = require('./district.controller');
const teachingController = require('./teaching.controller');
const studentController = require('./student.controller');
const contractController = require ('./contract.Controller');
const commentController = require('./comment.controller');

module.exports = {
  registerController,
  loginController,  
  districtController,
  teachingController,
  studentController,
  contractController,
  commentController
};