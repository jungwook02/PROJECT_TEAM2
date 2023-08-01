// user.js 파일
const mysql = require('mysql2');

// MySQL 연결 설정
const connection = mysql.createConnection({
  host: 'localhost:3000',
  user: 'JUNGWOOK',
  password: '20020520',
  database: 'kakao_users',
});

// MySQL 연결
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database.');
});

// MySQL 모델 정의
const User = {
  // 여기에 MySQL 모델 정의를 추가하세요.
};

module.exports = User;
