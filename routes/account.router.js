const registerController = require("../controllers").registerController;
const loginController = require("../controllers").loginController;
const passport = require("passport");
var cors = require("cors");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

module.exports = app => {
  // Add headers
  // app.use(function(req, res, next) {
  //   // Website you wish to allow to connect
  //   res.setHeader("Access-Control-Allow-Origin", true);

  //   // Request methods you wish to allow
  //   res.setHeader(
  //     "Access-Control-Allow-Methods",
  //     "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  //   );

  //   // Request headers you wish to allow
  //   res.setHeader(
  //     "Access-Control-Allow-Headers",
  //     "X-Requested-With,content-type"
  //   );

  //   // Set to true if you need the website to include cookies in the requests sent
  //   // to the API (e.g. in case you use sessions)
  //   res.setHeader("Access-Control-Allow-Credentials", true);

  //   // Pass to next layer of middleware
  //   next();
  // });
 
  
  app.get("/api", (req, res) =>
    res.status(200).send({
      message: "Welcome to the Todos API!"
    })
  );
  app.post("/api/login-user", loginController.login);
  app.get("/api/getList", registerController.list);
  app.post("/api/register-user", registerController.createAccount);
  app.get("/api/verify-account", registerController.verifyAccount); // chưa có trong file word

  // chưa có trong file word
  app.get(
    "/api/profile",
    passport.authenticate("jwt", { session: false }),
    loginController.getProfile
  );

  app.post("/api/forget-password", loginController.forgetPassw);
  app.post("/api/update-new-password", loginController.updateNewPassw);
  app.post("/api/image", upload.single("avatar"), loginController.addImage);
  app.post(
    "/api/auth/facebook",cors(),
    passport.authenticate(
      "facebook",
      {
        failureRedirect: "/info",
        scope: ["email"]
      },
      { session: false }
    ),
    loginController.authFacebook
  );
};
