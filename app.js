const express = require('express');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const passport = require('passport');
const dotenv = require('dotenv');
const ejs = require('ejs');

// Express 앱 생성
const app = express();

// 환경 변수 설정 (dotenv 사용)
dotenv.config();

// body-parser 미들웨어 등록
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// nunjucks 설정 부분 활성화
app.set('view engine', 'ejs'); // EJS 템플릿 엔진 설정
app.set('views', path.join(__dirname, 'views')); // 템플릿 파일이 위치한 디렉토리 설정
nunjucks.configure(path.join(__dirname, 'views'), {
    express: app,
    watch: true,
});

// session 미들웨어 등록
app.use(session({
  secret: process.env.SECRET_KEY, // 세션 데이터 암호화에 사용되는 비밀키
  resave: false,
  saveUninitialized: false,
}));

// Passport 미들웨어 등록 (express-session 뒤에 위치해야 함)
app.use(passport.initialize());
app.use(passport.session());

// passport-kakao 인증 전략 등록
require('./passport/kakaoStrategy')(); // 실제 파일 경로로 대체해야 합니다.

// 정적 파일 미들웨어 등록 (express.static는 라우팅 미들웨어보다 앞에 위치해야 함)
app.use(express.static(path.join(__dirname, 'public'))); // public 폴더에 정적 파일을 넣으세요.

// auth.js 파일을 올바르게 가져와서 kakaoRoutes 변수에 할당합니다.
const kakaoRoutes = require('./routes/auth.js');

// '/auth' 경로로 kakaoRoutes를 사용하기 위해 미들웨어로 등록
app.use('/auth', kakaoRoutes); // 카카오 로그인 관련 라우터

// 루트 경로로 접근할 때 index.ejs 파일을 렌더링
app.get('/', (req, res) => {
    res.render('index', { userAuthenticated: req.isAuthenticated() });
});

// 새로운 라우트를 추가하여 성공 리다이렉션 처리
app.get('/success', (req, res) => {
    if (req.isAuthenticated()) {
        res.render('add_data.ejs'); // 로그인한 사용자에게 add_data.ejs 파일을 렌더링
    } else {
        res.render('index', { userAuthenticated: false }); // 인증되지 않은 경우 index.ejs 파일을 렌더링
    }
});

// 서버 포트 설정 및 서버 시작
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});
