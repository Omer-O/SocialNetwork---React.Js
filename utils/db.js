// spicedPg setup
const spicedPg = require("spiced-pg");

//DB Auth
const dbUrl = process.env.DATABASE_URL || `postgres:postgres:postgres@localhost:5432/salt-socialmedia`;
var db = spicedPg(dbUrl);


module.exports.addUser = function addUser(firstName, lastName, email, password) {
    return db.query(
        `INSERT INTO users(first, last, email, password)
         VALUES ($1, $2, $3, $4)
         RETURNING id;`, [firstName, lastName, email, password]
     );
}

//get password:
module.exports.getUserData = function getUserData(email) {
    return db.query(`SELECT * FROM users WHERE email=$1`, [email]);
};
// module.exports.user = function user(email) {
//     return db.query(
//         `SELECT email, password, city, age, url, first, last, signatures.signature, users.id AS user_id, signatures.id AS sign_id
//         FROM users
//         LEFT OUTER JOIN signatures ON users.id = signatures.user_id
//         LEFT OUTER JOIN profile ON users.id = profile.user_id
//         WHERE email=$1`,
//         [email]
//     );
// };
