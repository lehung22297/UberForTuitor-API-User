const randomstring = require("randomstring");
const nodemailer = require("nodemailer");
const bcrypt = require('bcryptjs');
const db = require("../model/account.model");

module.exports = {
  // get list account
  list: async (req, res) => {
    return await db
      .getListAcc()
      .then(list => {
        res.status(200).send(list);
      })
      .catch(error => res.status(400).send(error));
  },

  //register account
  createAccount: async (req, res) => {
    let check = true;
    await db.getListAcc().then(list => {
      list.forEach(element => {
        if (req.body.gmail === element.gmail) {
          check = false;
          return check;
        }
      });
    });
    if (check) {
      let keyPass = randomstring.generate(100);
      // config mail server
      var transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: "lchung9739@gmail.com",
          pass: "0309hung"
        }
      });
      var url =
        "http://localhost:3000/api/verify-account?email=" + req.body.gmail + '&key=' + keyPass;
      var mainOptions = {
        // thiết lập đối tượng, nội dung gửi mail
        from: "AH!BreakingNews",
        to: req.body.gmail, //đến đâu
        subject: "Email xác thực tài khoản từ website gia sư online",
        html:
          '<p>Đây là thông tin bảo mật, đừng để nó public ra ngoài</p></br><a href="' +
          url +
          '"><b>Click here to verify account!!!</b></a>'
      };
      transporter.sendMail(mainOptions, function(err, info) {
        if (err) {
          console.log("err", err);
        }
      });
      
      var salt = bcrypt.genSaltSync(10);
      var hashPassw = bcrypt.hashSync(req.body.password,salt);

      let entity = {
        name: req.body.name,
        gmail: req.body.gmail,
        password: hashPassw,
        districtId: req.body.districtId,
        categoryUser: req.body.categoryUser,
        state: 0,
        gender: req.body.gender,
        keyPass: keyPass
      };

      return db
        .createAcc(entity)
        .then(id => res.status(200).send({ status: "200" }))
        .catch(error => res.status(400).send(error));
    } else return res.status(400).send({ message: "Tài khoản đã tồn tại" });
  },

  //confirm accout by email
  verifyAccount(req, res) {
    let mail = req.query.email;
    let keyPass = req.query.key
    if(keyPass && mail)
    {
      db.getAccByEmail(mail).then(row => {
        if(keyPass === row[0].keyPass)
        {
          let entity = {
            userId: row[0].userId,
            state: 1
          };
          db.updateAcc(entity).catch(error => res.status(400).send(error));
          res.send("Xác thực thành công, bạn có thể đăng nhập vào trang web....");
        }
        else 
        {
          res.send("Xác thực không thành công, vui lòng vào chính xác eamil để xác thực....");
        }
      });
    }
    else {
      res.send("Xác thực không thành công, vui lòng vào chính xác  eamil để xác thực....");
    }
  }
};
