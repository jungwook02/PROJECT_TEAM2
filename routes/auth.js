// auth.js
const express = require('express');
const passport = require('passport');
const router = express.Router();

// /auth/kakao
router.get('/kakao', passport.authenticate('kakao'));

// /auth/kakao/callback
router.get('/kakao/callback', passport.authenticate('kakao', {
    failureRedirect: '/auth/login',
}), (req, res) => {
    res.redirect(`/${req.user.user_id}`);
});

module.exports = router;
