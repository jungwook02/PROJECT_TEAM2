
const User = require('../models/user'); // user 모델 경로

exports.saveUserData = async (req, res) => {
    try {
        const { house, target } = req.body;

        // 사용자 입력을 토대로 user 모델의 함수를 호출하여 데이터베이스에 저장
        User.saveUserInfo(req.user, house, target, (err, result) => {
            if (err) {
                console.error('Error saving user data:', err);
                return res.redirect('/error'); // 에러 발생 시 error 페이지로 리다이렉트
            }
            res.redirect('/'); // 데이터 저장 후 메인 페이지(index.ejs)로 리다이렉트
        });
    } catch (err) {
        console.error('Error saving user data:', err);
        res.redirect('/error'); // 에러 발생 시 error 페이지로 리다이렉트
    }
};


