// // passport/index.js

// const passport = require('passport');
// const KakaoStrategy = require('passport-kakao').Strategy;
// const User = require('../models/user');

// module.exports = () => {
//     passport.serializeUser((user, done) => {
//         done(null, user.kakao_id);
//     });

//     passport.deserializeUser((kakao_id, done) => {
//         // User.findOne 함수에서 사용자를 찾아야 합니다.
//         User.findOne(kakao_id, (err, user) => {
//             if (err) {
//                 return done(err);
//             }
//             done(null, user || {}); // 사용자가 없는 경우 빈 객체를 전달합니다.
//         });
//     });

//     // ... 나머지 코드 ...
// };