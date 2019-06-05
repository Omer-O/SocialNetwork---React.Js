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
}

//get password:
module.exports.getUserDataByMail = function getUserDataByMail(email) {
    return db.query(`SELECT * FROM users WHERE email=$1`, [email]);
};//

module.exports.getUserDataById = function getUserDataById(userId) {
    return db.query(`SELECT * FROM users WHERE id=$1`, [userId]);
};

module.exports.updateUserImg = function updateUserImg(id, imgUrl) {
    return db.query(`
        UPDATE users
        SET url=$2
        WHERE id=$1
        RETURNING id, first, url`, [id, imgUrl]);
}

module.exports.updateUserBio = function updateUserBio(id, bio) {
    return db.query(`
        UPDATE users
        SET bio=$2
        WHERE id=$1, );
        RETURNING id, first, url, bio`, [id, bio]);
}
