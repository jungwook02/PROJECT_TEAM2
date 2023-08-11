const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'svc.sel3.cloudtype.app',
    user: 'admin',
    password: '1234',
    database: 'db',
    port:30458
});



connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database.');
});

const User = {
  findById: function (id, callback) {
    connection.query('SELECT * FROM kakao_users WHERE id = ?', [id], (err, results) => {
      if (err) {
        if (callback) {
          return callback(err, null);
        }
        console.error('Error in findById:', err);
      } else {
        if (callback) {
          return callback(null, results[0]);
        }
        console.log('findById result:', results[0]);
      }
    });
  },
  findOne: function (condition, callback) {
    connection.query('SELECT * FROM kakao_users WHERE ?', condition, (err, results) => {
      if (err) {
        if (callback) {
          return callback(err, null);
        }
        console.error('Error in findOne:', err);
      } else {
        if (callback) {
          return callback(null, results[0]);
        }
        console.log('findOne result:', results[0]);
      }
    });
  },
  // 다른 함수들도 필요에 따라 추가할 수 있습니다.
};

module.exports = User;
