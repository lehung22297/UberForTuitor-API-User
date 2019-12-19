var db = require("../utils/connectDB");

module.exports = {
  updateSkillTeacher: entity => {
    return db.add("skill_teacher", entity);
  },

  updateSkillContract: entity => {
    return db.add("skill_contract", entity);
  },

  getSkillTeacher: (skill, teacher) => {
    return db.load(
      `select * from skill_teacher where skillId = '${skill}' and userId = '${teacher}'`
    );
  },

  getListSkillTeacher: id => {
    return db.load(`select * from skill_teacher where userId='${id}'`);
  },

  getNameSkillTeacher: id => {
    return db.load(`select sk.* from skill_teacher as st JOIN skill as sk on st.skillId = sk.skillId where st.userId='${id}'`);
  },

  deleteSkillTeacher: id => {
    return db.delete("skill_teacher", "userId", id);
  }
};
