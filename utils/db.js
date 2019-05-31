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
module.exports.getPass = function getPass(email) {
    return db.query(`SELECT password FROM users WHERE email=$1`, [email]);
};
