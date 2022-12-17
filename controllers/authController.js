const User = require("../models/user");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const sendEmail = require("../utils/email");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const signup = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;

  // bcrypt kullanarak passwordu şifreliyoruz ve şifreleme basarılı olursa veritabanına kullanıcı ekliyoruz
  bcrypt
    .hash(password, 12)
    .then((hashedPassword) => {
      const user = new User({
        email: email,
        password: hashedPassword,
        name: name,
      });
      return user.save();
    })
    .then((result) => {
      res.status(200).json("User successfully created" + result);
    })
    .catch((err) => {
      res.json("get some error" + err);
    });
};
const forgotPassword = async (req, res) => {
  const email = req.body.email;
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(400).json("User couldnt found this email");
  }
  // Generate random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  const resetURL = `http://localhost:5000/reset-password/${resetToken}`;
  const message = `Forgot password! Submit request with new passord to: ${resetURL}`;
  try {
    await sendEmail({
      email: user.email,
      subject: "your password reset token 10 min",
      message,
    });
    res.status(200).json({
      status: "success",
      message: "Token send email",
    });
  } catch (error) {
    (user.passwordResetToken = undefined),
      (user.passwordResetExpires = undefined);
    await user.save({ validateBeforeSave: false });
    return res.status(400).json("There is an error");
  }
};
const resetPassword = async (req, res, next) => {
  // get user with token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // check user
  if (!user) {
    res.status(400).json("Couldnt found user with token");
  }
  bcrypt.hash(req.body.password, 12).then((hashedPassword) => {
    user.password = hashedPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    return user.save();
  });

  const token = jwt.sign(
    {
      email: user.email,
      userId: user._id.toString(),
    },
    "secret"
  );
  res.status(200).json({
    token: token,
    userId: user._id.toString(),
    userRole: user.role.toString(),
  });
};
const login = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        res.status(400).json("User with this email could not found");
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    }) // eger ki bcryptde karşılaştırılan şifreler dogruysa  asagidaki then bloguna gidiek
    .then((isEqual) => {
      if (!isEqual) {
        res.status(401).json("Password is not equal");
      }
      //jwt token olusturmak için jwt sign metodu kullanılır ve bu token bilgi olarak email ve id icermeli
      // passwordu yazmamalıyız cunku front end tarafından bu bilgiler görüntülenebilir şifre gizli kalmalı

      const token = jwt.sign(
        {
          email: loadedUser.email,
          userId: loadedUser._id.toString(),
          //role: loadedUser.role.toString(),
        }, //2. paramtere kendi belirledigimiz bu jwt nin ismi gibi bilgi daha sonra kullanabilmek için tanımlıyoruz
        "secret" //expiresin ise olusan tokenin ne zaman sonra sonlanacagını yazıyor burada 1 saat olarak belirledik
        //{ expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        userId: loadedUser._id.toString(),
        userRole: loadedUser.role.toString(),
      });
    })
    .catch((err) => {
      console.log("login error" + err);
    });
};

module.exports = {
  signup,
  login,
  forgotPassword,
  resetPassword,
};
