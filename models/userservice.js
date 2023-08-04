const User = require('./models/user'); // user.js 파일의 경로로 수정

// 사용자 ID로 사용자 검색
User.findById(1, (err, user) => {
  if (err) {
    console.error('Error finding user by ID:', err);
    return;
  }

  if (user) {
    console.log('User found:', user);
  } else {
    console.log('User not found.');
  }
});

// 다른 조건으로 사용자 검색
User.findOne({ name: 'John Doe' }, (err, user) => {
  if (err) {
    console.error('Error finding user:', err);
    return;
  }

  if (user) {
    console.log('User found:', user);
  } else {
    console.log('User not found.');
  }
});