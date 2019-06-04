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
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieSession({
    secret: `I'm always angry.`,
    maxAge: 1000 * 60 * 60 * 24 * 14
}));

app.use(csurf());

app.use(function(req, res, next){
    res.cookie('mytoken', req.csrfToken());
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

//////////// registration post request:
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
            req.session.userId = pass.rows[0].id;
            res.json({
                userId: pass.rows[0].id,
                success: true
            })
        }).catch(err => {
            console.log('error addUser welcome POST:', err);
            res.json({
                error: "oops, WRONG INFO"
            });
        });
    }).catch(err => {
        console.log('error hashPassword welcome POST:', err);
        res.json({
            error: "oops, WRONG INFO"
        });
    });
});

///////////////// login post request ////////////
app.post('/login', (req,res) => {
        db.getUserDataByMail(req.body.email
        ).then(newPass => {
            bc.checkPassword(req.body.password, newPass.rows[0].password
        ).then(matchPass => {
            if (matchPass) {
                req.session.userId = newPass.rows[0].id;
                res.json({
                    userId: newPass.rows[0].id,
                    success: true
                });
            }
        }).catch(err => {
            console.log('error checkPassword login ERROR:', err);
            res.json({
                error: "Invalid Password"
            });
        });
    }).catch(err => {
        console.log('error getPass login error ERROR:', err);
        res.json({
            error: "Invalid E-mail address"
        });
    });
});
//////////////////// upload picture ////////////////////////////
app.post('/user-image', uploader.single('file'),
        s3.upload, function(req, res) {
            console.log('user-image req.body', req.body);
            let imageUrl = "https://s3.amazonaws.com/spicedling/" + req.file.filename;
            db.updateUserImg(req.session.userId, imageUrl)
                .then(result => {
                    console.log('result of updateUserImg:', result);
                    res.json({
                        id: result.rows[0].id,
                        imageUrl: result.rows[0].imageUrl,
                        first: result.rows[0].first,
                        success: true
                    });
                }).catch(err => {
                    console.log('updateUserImg ERROR:', err);
                    res.json({
                        error: "Upload failed"
                    });
                });
});//uploader.single function close
///////////////// logOut page /////////////////////////////
app.get('/user', (req, res) => {
    console.log('req.session.userId :', req.session.userId);
    if (!req.session.userId) {
        res.redirect('/login');
    } else {
        db.getUserDataById(req.session.userId)
        .then(result => {
            const userData = result.rows[0];
                console.log('image:', userData);
                res.json({
                    id: userData.id,
                    first: userData.first,
                    last: userData.last,
                    imageUrl: userData.url,
                    bio: userData.bio,
                    success: true
                });
        }).catch(err => {
            console.log('getUserDataById ERROR:', err);
            // res.json({
            //     error: "Upload failed"
            // });
        });
    }
});


app.get('/logout', (req,res) => {
    req.session = null;
    res.redirect('/welcome');
});

app.get("*", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});
//all the routes we will serve JSON! only 1 route
//will serve index.html
//After using cookie.session We can use:
// app.get('*', function(req, res) {
//     if (!req.session.userId) {
//         res.redirect('/');
//     } else {
//     res.sendFile(__dirname + '/index.html');
//     }
// });
app.listen(8080, function() {console.log("I'm listening.");});
