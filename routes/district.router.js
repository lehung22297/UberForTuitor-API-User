const districtController = require('../controllers').districtController

module.exports = app => {
    app.get('/api/get-districts-by-city/:id', districtController.get_list_districts);
    app.get('/api/get-list-city', districtController.getListCIty);
    app.get('/api/get-list-district', districtController.getListDistrict);
    app.get('/api/get-city-by-district/:id', districtController.getCityByDistrict)
}