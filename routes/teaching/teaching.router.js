const teachingController = require('../../controllers').teachingController;

module.exports = app => {
    app.get('/api/get-list-teaching', teachingController.getListTeaching);
    app.post('/api/update-infor-teacher', teachingController.updateInforTeacher);
    app.get('/api/get-detail-teacher/:id', teachingController.getTeacherByid);
    //
    app.get('/api/get-detail-single-teacher/:id', teachingController.getTeacherSingleByid);
    //
    app.get('/api/get-List-Skill-ByUser/:id',teachingController.getListSkillByUser)
    app.get('/api/get-name-Skill-ByUser/:id',teachingController.getNameSkillByUser)
    app.get('/api/get-list-skills', teachingController.getListSkills);
    //chưa test sắp xếp
    app.get('/api/get-list-top-teacher', teachingController.getTopTeacher); // top 4
    app.get('/api/get-list-top-six-teachers', teachingController.getTopSixTeacher); // top 6

    // app.get('/api/get-teachers-by-gia', teachingController.getTeaherbyPrice);
    app.get('/api/get-teachers-price-increase', teachingController.getTeacherPriceIncrease);
    app.get('/api/get-teachers-price-decrease', teachingController.getTeacherPriceDecrease);
    //
    app.get('/api/get-teachers-rate-success-decrease', teachingController.getTeacherRateSuccessDecrease);
    
    //chuẩn bị  làm
    app.get('/api/get-teachers-by-one-start', teachingController.getTeachersByOneStar);
    app.get('/api/get-teachers-by-two-start', teachingController.getTeachersByTwoStar);
    app.get('/api/get-teachers-by-three-start', teachingController.getTeachersByThreeStar);
    app.get('/api/get-teachers-by-four-start', teachingController.getTeachersByfourStar);
    app.get('/api/get-teachers-by-five-start', teachingController.getTeachersByfiveStar);
    //
    app.get('/api/get-teachers-by-skill/:id', teachingController.filterTeacherBySkill);
    //
    app.get('/api/get-teachers-min-price', teachingController.getTeacherByMinPrice);
    app.get('/api/get-teachers-middle-price', teachingController.getTeacherByMiddlePrice);
    app.get('/api/get-teachers-max-price', teachingController.getTeacherByMaxPrice);

    //
    app.get('/api/get-teachers-by-district/:id', teachingController.getTeacherByDistrict);
    //
    app.get('/api/get-comment-by-user/:id', teachingController.getCommentByUser);

}