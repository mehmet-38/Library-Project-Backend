const jwt = require("jsonwebtoken");

const isAuth = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    res.json("Not authanticated");
  }

  const token = authHeader.split(" ")[1];
  let decodedToken;
  try {
    //jwt verify kodu giriş yaptıgımza olusturulan tokeni decode ederek dogru olup olmadıgına bakıyor
    decodedToken = jwt.verify(token, "secret");
    return res.json(decodedToken);
  } catch (error) {
    res.status(500).json("Token is not availabe" + error);
  }

  // autharize basarılı ise token decode edilerek giriş yapılı kullanıcıya id ataması yapılır

  req.userId = decodedToken.userId;
  next();
};
module.exports = { isAuth };
