const studentController = require('../controllers').studentController;

module.exports = app => {
   app.post('/api/update-infor-student',studentController.updateInforStudent)

}