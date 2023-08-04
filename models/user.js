const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'park',
    password: '2002',
    database: 'kakao',
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
    }
    console.log('Connected to MySQL database.');
});

const User = {
    saveUserInfo: function (userInfo, callback) {
        const sqlSelectUser = 'SELECT * FROM users WHERE kakao_id = ?';
        connection.query(sqlSelectUser, [userInfo.kakao_id], (err, result) => {
            if (err) {
                return callback(err);
            }

            if (result.length > 0) {
                console.log('이미 동일한 kakao_id를 가진 사용자가 존재합니다:');
                console.log(result[0]);
                return callback(null, result[0]);
            } else {
                const sqlInsertUser = 'INSERT INTO users (kakao_id, name, age_range, gender) VALUES (?, ?, ?, ?)';
                const values = [
                    userInfo.kakao_id,
                    userInfo.name,
                    userInfo.age_range || null,
                    userInfo.gender || null,
                ];
                connection.query(sqlInsertUser, values, (err, result) => {
                    if (err) {
                        return callback(err);
                    }
                    console.log('새로운 사용자 정보가 성공적으로 저장되었습니다!');
                    return callback(null, result);
                });
            }
        });
    },
};

module.exports = User;
