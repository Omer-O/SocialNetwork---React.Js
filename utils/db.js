// spicedPg setup
const spicedPg = require("spiced-pg");

//DB Auth
const dbUrl = process.env.DATABASE_URL || `postgres:postgres:postgres@localhost:5432/salt-socialmedia`;
var db = spicedPg(dbUrl);


module.exports.addUser = function addUser(firstName, lastName, email, password) {
    return db.query(
        `INSERT INTO users(first, last, email, password)
         VALUES ($1, $2, $3, $4)
         RETURNING id;`,
         [firstName || null, lastName || null, email|| null, password || '']
     );
}//addUser close.

//get password:
module.exports.getUserDataByMail = function getUserDataByMail(email) {
    return db.query(`SELECT * FROM users WHERE email=$1`, [email]);
};//getUserDataByMail close.

module.exports.getUserDataById = function getUserDataById(userId) {
    return db.query(`SELECT * FROM users WHERE id=$1`, [userId]);
};//getUserDataById close.

module.exports.updateUserImg = function updateUserImg(id, imgUrl) {
    return db.query(`
        UPDATE users
        SET url=$2
        WHERE id=$1
        RETURNING id, first, url`, [id, imgUrl]);
}//updateUserImg close.

module.exports.updateUserBio = function updateUserBio(id, bio) {
    return db.query(`
        UPDATE users
        SET bio=$2
        WHERE id=$1
        RETURNING id, first, last, url, bio`, [id, bio]);
}//updateUserBio close.

module.exports.getMatchingUsers = function getMatchingUsers(val) {
    return db.query(
        `SELECT first FROM users
         WHERE first
         ILIKE $1
         LIMIT 4;`, [val + '%']);
}//getMatchingUsers close.

module.exports.selectUsers = function selectUsers() {
    return db.query(
        `SELECT * FROM users
         ORDER BY created_at DESC
         LIMIT 3; `);
}//selectUsers close.
module.exports.searchUsers = function searchUsers(text) {
    return db.query(`
        SELECT id, first, last, url
        FROM users
        WHERE first ILIKE $1
        OR last ILIKE $1
        LIMIT 20;`,[text + '%']);
};//searchUsers close.
