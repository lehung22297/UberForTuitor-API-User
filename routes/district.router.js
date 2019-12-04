const districtController = require('../controllers').districtController

module.exports = app => {
    app.post('/api/get-districts-by-city', districtController.get_list_districts);
}