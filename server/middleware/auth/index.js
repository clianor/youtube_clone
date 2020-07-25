const { User } = require("../../models/User");

let auth = (req, res, next) => {
  //인증 처리를 하는곳
  //클라이언트 쿠키에서 토큰을 가져온다.

  let token = req.cookies.x_auth;

  // 토큰을 복호화 한후  유저를 찾는다.
  User.findByToken(token, (error, user) => {
    // if (!user) return res.json({ success: false, errMsg: err.message });
    if (!user) {
      req.token = null;
      req.user = null;
      req.error = error.message;
    } else {
      req.token = token;
      req.user = user;
    }

    next();
  });
};

module.exports = { auth };
