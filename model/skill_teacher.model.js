var db = require("../utils/connectDB");

module.exports = {
    updateSkillTeacher: entity => {
        return db.add("skill_teacher", entity);
    },

    getSkillTeacher: (skill,teacher) => {
        return db.load(`select * from skill_teacher where skillId = '${skill}' and userId = '${teacher}'`);
    }
}