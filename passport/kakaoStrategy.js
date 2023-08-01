const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;

const User = require('../models/user');

module.exports = () => {
    passport.use(new KakaoStrategy({ // 첫번째 인자에는 인증에 필요한 값들을 적어넣는다. (카카오 서버에 전송하여 인증받을 내용.)
        callbackURL: 'http://localhost:3000/auth/kakao/callback', // 카카오 디벨로퍼에 적어놓은 redirect uri와 같아야 한다
        clientID: process.env.KAKAO_ID, // 내 앱의 REST API
    }, 
    async(accessToken, refreshToken, profile, done) => { // 사용자가 유효한지 확인하는 verify 콜백함수 
        // accessToken과 refreshToken: 인증을 유지시켜주는 토큰
        // profile: 사용자 정보 객체
        // done(error, user): passport-twitter가 자체적으로 req.login와 serializeUser 호출하여 req.session에 사용자 아이디를 저장한다
        try{
        const exUser = await User.findOne({where: {sns_id: profile.id, provider:'kakao'}});
        done(null, exUser);
        }catch(err){
            done(err);
        }    
    }));
};