const express = require('express');
const app = express();
const db = require('./utils/db');
const bc = require('./utils/bc');
const bodyParser = require('body-parser');
const multer = require('multer');
const s3 = require('./s3');
const path = require('path');
const uidSafe = require('uid-safe');
const csurf = require('csurf');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const compression = require('compression');//compress the responses
//that cant be compresed - like jsep middleware - GET from the server
// compressed files which are always necessary!
app.use(compression());

app.use(bodyParser.json());

app.use(cookieSession({ //this code create a session with the cookie.
    secret: `I'm always angry.`,
    maxAge: 1000 * 60 * 60 * 24 * 14
}));

app.use(bodyParser.urlencoded({extended: false}));
app.use(csurf());
app.use((req, res, next) => {
res.locals.csrfToken = req.csrfToken();
     // res.setHeader('X-FRAME-OPTIONS', 'DENY');
    next();
});

var diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + '/uploads');
    },
    filename: function (req, file, callback) {
      uidSafe(24).then(function(uid) {
          callback(null, uid + path.extname(file.originalname));
      });
    }
});

var uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});

app.use(express.static('./public'));

if (process.env.NODE_ENV != 'production') {
    app.use(
        '/bundle.js',
        require('http-proxy-middleware')({
            target: 'http://localhost:8081/'
        })
    );
} else {
    app.use('/bundle.js', (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}
///////////////// regestration page /////////////////////////////
// app.get("/registration", (req, res) => {
//     res.render("registration", {
//         layout: "main",
//         siteName: "The DUDE Day",
//     });
// });
// ///registration post request:
// app.post('/registration', (req,res) => {
//         bc.hashPassword(req.body.password
//         ).then(hashPass => {
//             db.addUser(
//             req.body.first,
//             req.body.last,
//             req.body.email,
//             hashPass
//         ).then(pass => {
//             req.session.userId = pass.rows[0].id;
//             req.session.first = pass.rows[0].first;
//             req.session.last = pass.rows[0].last;
//             req.session.email = pass.rows[0].email;
//             res.redirect('/profile');
//         }).catch(error => {
//             console.log(error);
//         });
//     });
// });
//all the routes we will serve JSON! only 1 route
//will serve index.html
//After using cookie.session We can use:
app.get('/welcome', function(req, res) {
    // if (!req.session.userId) {
    //     res.redirect('/');
    // } else {
    res.sendFile(__dirname + '/index.html');
    //}
});

app.get('*', function(req, res) {
    // if (!req.session.userId) {
    //     res.redirect('/welcome');
    // } else {
    res.sendFile(__dirname + '/index.html');
    //}
});

app.listen(8080, function() {console.log("I'm listening.");});
