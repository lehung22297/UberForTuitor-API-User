const passport = require("passport");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
var { generateToken, sendToken } = require("../utils/token.utils");
const db = require("../model/account.model");
const dbSkill_teacher = require("../model/skill_teacher.model");
module.exports = {

  login: async (req, res) => {
    passport.authenticate("local", { session: false }, (err, user, info) => {
      if (err || !user) {
        return res.status(400).json({
          message: "Something is not right"
        });
      }
      req.login(user, { session: false }, err => {
        if (err) {
          res.send(err);
        }
        // generate a signed son web token with the contents of user object and return it in the response
        const token = jwt.sign(user, "lchung_jwt_secret");
        return res.json({ token });
      });
    })(req, res);
  },

  // lấy thông tin người bằng xác thực token
  getProfile: (req, res) => {
    res.send(req.user);
  },

  //quên mật khẩu
  forgetPassw: (req, res) => {
    const gmail = req.body.gmail;
    db.getAccByEmailRegister(gmail).then(row => {
      if (row.length > 0) {
        var url =
          "http://localhost:3000/api/update-new-password?email=" +
          req.body.gmail +
          "&key=" +
          row[0].keyPass;
        var transporter = nodemailer.createTransport({
          service: "Gmail",
          auth: {
            user: "lchung9739@gmail.com",
            pass: "0309hung"
          }
        });
        var mainOptions = {
          // thiết lập đối tượng, nội dung gửi mail
          from: "AH!BreakingNews",
          to: gmail, //đến đâu
          subject: "Email lấy lại mật khẩu từ website gia sư online",
          html:
            '<p>Đây là thông tin bảo mật, đừng để nó public ra ngoài</p></br><a href="' +
            url +
            '"><b>Click here to reset password</b></a>'
        };
        transporter.sendMail(mainOptions, function(err, info) {
          if (err) {
            console.log(err);
          } else {
            console.log("Message sent: " + info);
            res
              .status(200)
              .send({ message: "Gửi thông tin xác thực đến email thành công" });
          }
        });
      } else {
        res.status(200).send("email không chính xác");
      }
    });
  },

  //cập nhật password mới
  updateNewPassw: (req, res) => {
    var mail = req.query.email;
    var keyPass = req.query.key;
    if (mail && keyPass) {
      var pass = req.body.newPass;
      var salt = bcrypt.genSaltSync(10);
      var hashPassw = bcrypt.hashSync(pass, salt);
      db.getAccByEmailRegister(mail).then(row => {
        if (keyPass === row[0].keyPass) {
          var entity = {
            userId: row[0].userId,
            password: hashPassw
          };
          db.updateAcc(entity)
            .then(id => {
              res.status(200).json({ message: "cập nhật mật khẩu thành công" });
            })
            .catch(err => {
              console.log(err);
              res.status(400).json({ message: "Cập nhật mật khẩu thất bại" });
            });
        } else {
          res.status(400).json({ message: "Cập nhật mật khẩu thất bại" });
        }
      });
    } else {
      res.status(400).json({ message: "Đường truyền không chính xác" });
    }
  },

  // đăng kí thông tin người dạy
  addProfileTeacher: (req, res) => {
    var gmail = req.body.gmail;
    let skills = req.body.skill;
    var listSkill = skills.toString().split(",");
    // console.log(listSkill);

    return db.getAccByEmail(gmail).then(user => {
      let entity = {
        userId: user[0].userId,
        introduce: req.body.introduce,
        avatar: req.body.avatar,
        price: req.body.price
      };
      listSkill.forEach(element => {
        if (element) {
          dbSkill_teacher.getSkillTeacher(element, user[0].userId).then(row => {
            if (row.length === 0) {
              let skill_teacher = {
                userId: user[0].userId,
                skillId: element
              };
              dbSkill_teacher.updateSkillTeacher(skill_teacher);
            }
          });
        }
      });
      db.updateAcc(entity)
        .then(id => res.status(200).json({ message: "đăng kí dạy thành công" }))
        .catch(err =>
          res.status(400).json({ message: "đăng kí thất bại", err: err })
        );
    });
  },

  //thêm link avatar
  addImage: (req, res) => {
    return res.json({
      avatar: req.file.path
    });
  },

  //đăng nhập bằng fb
  authFacebook: (req, res, next) => {
    console.log("----------------", req.body);
    // console.log("----------------", res);
      // function(req, res, next) {
        console.log('------------',req.user);
        if (!req.user) {
          return res.send(401, "User Not Authenticated");
        }
        req.auth = {
          id: req.user.id
        };
        next();
      }
};
