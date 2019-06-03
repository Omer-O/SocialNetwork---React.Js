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
const compression = require('compression');
app.use(compression());

app.use(express.static('./public'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//app.use(csurf());
// app.use((req, res, next) => {
// res.locals.csrfToken = req.csrfToken();
//      // res.setHeader('X-FRAME-OPTIONS', 'DENY');
//     next();
// });

app.use(cookieSession({
    secret: `I'm always angry.`,
    maxAge: 1000 * 60 * 60 * 24 * 14
}));

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
///////////////// welcome page ///////////////////
app.get("/", function(req, res) {
    if (req.session.userId) {
        res.sendFile(__dirname + "/index.html");
    } else {
        res.redirect("/registration");
    }
});

///welcome post request:
app.post('/registration', (req, res) => {
    console.log('this is welcome req.body', req.body);
    console.log('req.body.password :', req.body.password);
        bc.hashPassword(req.body.password
        ).then(hashPass => {
            console.log('this is hashpass:', hashPass);
            db.addUser(
            req.body.first,
            req.body.last,
            req.body.email,
            hashPass
        ).then(pass => {
            console.log('this is pass POST:', pass);
            req.session.userId = pass.rows[0].id;
            console.log('this is welcome req.session.userId:', req.session.userId);
            res.json({
                userId: pass.rows[0].id,
                success: true
            })
        }).catch(err => {
            console.log('error addUser welcome POST:', err);
            res.json({
                success: false
            });
        });
    }).catch(err => {
        console.log('error hashPassword welcome POST:', err);
        res.json({
            success: false
        });
    });
});

app.get("*", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});
//all the routes we will serve JSON! only 1 route
//will serve index.html
//After using cookie.session We can use:
// app.get('/welcome', function(req, res) {
//     // if (!req.session.userId) {
//         res.redirect('/');
//     // } else {
//     res.sendFile(__dirname + '/index.html');
//     // }
// });
app.listen(8080, function() {console.log("I'm listening.");});
