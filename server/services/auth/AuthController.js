const { User } = require("../../models/User");

exports.loginController = (req, res) => {
  // 로그인
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        success: false,
        errMsg: "존재하는 유저가 없습니다.",
      });
    }

    // 비밀번호 체크
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          success: false,
          errMsg: "비밀번호가 틀렸습니다.",
        });

      // 토큰 생성
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        res
          .cookie("x_auth", user.token)
          .status(200)
          .json({
            success: true,
            _id: user._id,
            isAdmin: user.role === 0 ? false : true,
            isAuth: true,
            email: user.email,
            name: user.name,
            lastname: user.lastname,
            role: user.role,
            image: user.image,
          });
      });
    });
  });
};

exports.registerController = (req, res) => {
  // 회원가입
  const user = new User(req.body);
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
};

exports.logoutController = (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).clearCookie("x_auth").send({
      success: true,
    });
  });
};

exports.infoController = (req, res) => {
  return res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
  });
};
