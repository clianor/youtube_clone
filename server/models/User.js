const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const saltRounds = 10;

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    minlength: 5,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  salt: String,
  token: {
    type: String,
  },
});

userSchema.pre("save", function (next) {
  var user = this;

  // 패스워드가 변경되었을때
  if (user.isModified("password")) {
    // 비밀번호 암호화
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);

        user.salt = salt;
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function (password, cb) {
  var user = this;

  // 패스워드 비교
  bcrypt.compare(password, user.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

userSchema.methods.generateToken = function (cb) {
  var user = this;

  // jsonwebtoken을 이용해서 token을 생성하기
  const token = jwt.sign(
    {
      id: user._id.toHexString(),
      email: user.email,
      exp: Math.floor(Date.now() / 1000) + 60 * 60, // 1 시간
    },
    user.salt
  );

  user.token = token;
  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

userSchema.statics.findByToken = async function (token, cb) {
  try {
    const user = await User.findOne({ token: token });

    // 토큰을 decode 함
    jwt.verify(token, user.salt, function (err, decoded) {
      User.findOne({ _id: decoded.id, token: token }, function (err, user) {
        if (err) return cb(err);
        cb(null, user);
      });
    });
  } catch (err) {
    console.error(err);
  }
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
