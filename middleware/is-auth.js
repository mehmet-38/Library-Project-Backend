const User = require("../models/user");
const jwt = require("jsonwebtoken");

let decodedToken;
const isAuth = async (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    res.json("Not authanticated");
  }
  const token = authHeader.split(" ")[1];
  try {
    //jwt verify kodu giriş yaptıgımza olusturulan tokeni decode ederek dogru olup olmadıgına bakıyor
    decodedToken = jwt.verify(token, "secret");
    const user = await User.findOne({ _id: decodedToken.userId });
    req.currentUser = user;
    return next();
  } catch (error) {
    res.status(500).json("Token is not availabe" + error);
  }

  // autharize basarılı ise token decode edilerek giriş yapılı kullanıcıya id ataması yapılır

  //req.userId = decodedToken.userId;
};
const isAdmin = (req, res, next) => {
  //console.log(req.currentUser);
  if (req.currentUser.role == 1) {
    next();
  } else {
    res.json("Yetkisiz işlem");
  }
};
const isEditor = (req, res, next) => {
  if (req.currentUser.role == 2) {
    next();
  } else {
    res.json("Yetkisiz islem");
  }
};
module.exports = { isAuth, isAdmin, isEditor };
