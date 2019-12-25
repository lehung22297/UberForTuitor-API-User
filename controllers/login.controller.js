const passport = require("passport");
const jwt = require("jsonwebtoken");
const randomstring = require("randomstring");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
var { generateToken, sendToken } = require("../utils/token.utils");

const db = require("../model/account.model");
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
    res.status(200).json(req.user);
  },

  //quên mật khẩu
  forgetPassw: (req, res) => {
    console.log(req.body.gmail);
    const gmail = req.body.gmail;
    db.getAccByEmailRegister(gmail).then(row => {
      if (row.length > 0) {
        var url =
          "https://uber-for-tuitor-ui-user.herokuapp.com/update-new-password?email=" +
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
          from: "ADMIN",
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
        res.status(400).json("email không chính xác");
      }
    });
  },

  updatePasswAfterLogin: (req, res) => {
    const gmail = req.body.gmail;
    var pass = req.body.newPass;
    var oldPass = req.body.oldPass;
    var salt = bcrypt.genSaltSync(10);
    var hashNewPassw = bcrypt.hashSync(pass, salt);
    var hashOldPass = bcrypt.hashSync(oldPass, salt);
    
    db.getAccByEmail(gmail).then(account => {
      if (bcrypt.compareSync(oldPass, account[0].password)) {
        var entity = {
          userId: account[0].userId,
          password: hashNewPassw
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
        res
          .status(400)
          .json({ message: "Cập nhật thất bai, vui lòng kiểm tra lại!" });
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
            password: hashPassw,
            keyPass : randomstring.generate(100),
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

  getMailByKeyPass: (req,res) => {
    // console.log(req.query.keyPass)
    db.getAccAdminByKeyPass(req.query.keyPass).then(result => {
      res.status(200).json(result);
    })
  },

  // đăng kí thông tin người dạy

  //thêm link avatar
  addImage: (req, res) => {
    return res.json({
      avatar: req.file.path
    });
  },

  //đăng nhập bằng fb
  authFacebook: (req, res, next) => {
    // console.log("----------------", req.body);
    // console.log("----------------", res);
    // passport.authenticate("facebook", { session: false }),
    // function(req, res, next) {
    console.log("------------", req.user);
    if (!req.user) {
      return res.send(401, "User Not Authenticated");
    }
    req.auth = {
      id: req.user.id
    };
    next();
  }
  //}
};
