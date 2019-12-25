const contractController = require('../controllers').contractController

module.exports = app => {
    app.get('/api/get-contract-by-user/:id', contractController.getContractByUser);
    app.get('/api/get-contract-by-teacher/:id', contractController.getContractByTeacher);
    app.post('/api/create-contract', contractController.createContract);

    //get  list contract
    app.get('/api/filter-list-contract-student/:idUser', contractController.filterListContractStudent);
    app.get('/api/filter-list-contract-teacher/:idUser', contractController.filterListContractTeacher);

    //detail contract
    app.get('/api/get-detail-contract/:id', contractController.detailContract);

    //cập nhật trạng thái.
    app.post('/api/update-state-contract/:id', contractController.updateStateContract)
    // get all contract
    app.get('/api/getAllContract', contractController.getAllContract)

    // doanh thu
    app.get('/api/get-sum-price-by-days/:id', contractController.getSumPriceByDate)
    app.get('/api/get-total-contracts-eachday/:idTeacher', contractController.getTotalContracts)
    app.get('/api/get-sum-eachmonth-byyear/:idTeacher', contractController.getSumPriceEachMonthByYear)
    app.get('/api/getsum-price-by-year/:id', contractController.getSumPriceByYear)
    app.get('/api/get-sum-price-and-contract/:id', contractController.getPriceAndContract)
}