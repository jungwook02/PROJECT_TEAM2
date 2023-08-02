const passport = require('passport');
const kakao = require('./kakaoStrategy');
const User = require("../models/user"); // requiire 대신 require를 사용해야 합니다.

module.exports = () => {
    passport.serializeUser((user, done) => { // User가 아니라 user로 수정합니다.
        done(null, user.id);
    });
    passport.deserializeUser((id, done) => {
        User.findOne({ where: { id } }) // findOne 메서드 내부의 User가 아니라 user로 수정합니다.
            .then((user) => done(null, user))
            .catch(err => done(err));
    });

    kakao();
}
