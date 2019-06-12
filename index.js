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
//////////// POST registration post request //////////
// app.post('/registration', async (req, res) => {
//     console.log("this is registration POST:", req.body);
//     const { first, last, email, password } = req.body;
//     try {
//         const hash = await bc.hashPassword(password);
//         const userData = await db.addUser(first, last, email, hash);
//
//         req.session.userId = userData.rows[0].id;
//         res.json({
//             userId: userData.rows[0].id,
//             success: true
//         });
//     } catch (e) {
//         console.log('ERROR');
//         res.json({
//             error: "oops, WRONG INFO"
//         });
//     }
// });
app.post('/registration', (req, res) => {
        bc.hashPassword(req.body.password
        ).then(hashPass => {
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
///////////////// POST login post request ////////////
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
//////////////////// POST upload picture ///////////////
app.post('/user-image', uploader.single('file'),
        s3.upload, function(req, res) {
            //console.log('user-image req.body', req.body);
            let imageUrl = "https://s3.amazonaws.com/spicedling/" + req.file.filename;
            db.updateUserImg(req.session.userId, imageUrl)
                .then(result => {
                    res.json({
                        id: result.rows[0].id,
                        imageUrl: result.rows[0].url,
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
///////////////// POST bio update page /////////////////
app.post('/bio', (req, res) => {
    let user = req.session.userId;
    let bio = req.body.bio;
    db.updateUserBio(user, bio).then(result => {
        res.json({
            id: result.rows[0].id,
            imageUrl: result.rows[0].url,
            first: result.rows[0].first,
            bio: result.rows[0].bio,
            success: true
        });
    }).catch(err => {
        console.log('updateUserBio BIO ERROR:', err);
        res.json({
            error: "Update info failed"
        });
    });
});//app.post('/bio') close.
//////////////////// GET user ////////////////
app.get('/user', (req, res) => {
    if (!req.session.userId) {
        res.redirect('/login');
    } else {
        db.getUserDataById(req.session.userId)
        .then(result => {
            const userData = result.rows[0];
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
        });
    }
});

////////////////// GET "/otheruser/:id" ////////////////
app.get("/otheruser/:id", async (req, res) => {
    if ( req.params.id == req.session.id ) {
        res.json({
            success: false
        });
    } else {
        try {
            const getUserDataById = await db.getUserDataById(req.params.id);
            console.log("getUserDataById:", getUserDataById);
            res.json(getUserDataById.rows[0]);
        } catch(err) {
                console.log('getUserDataById ERROR:', err);
                res.json({
                    error: "USER WAS NOT FOUND"
                });
         }
    }
});//getUserDataById close.
////////////////// GET "/friends/:user_id" ////////////////
app.get("/friends/:user_id", (req, res) => {
    let reciever = req.params.user_id;
    console.log("reciever:", reciever);
    let sender = req.session.userId;
    console.log("sender:", sender);
    if (  reciever != sender  ) {
        db.friendStatus(sender, reciever)
        .then(result => {
            console.log("result of GET friends:", result.rows[0]);
            if ( result.rowCount == 0 ) {
                res.json({
                    status: "Start Friendship"
                });
            } else if (result.rows[0].reciver_id == reciever) {
                res.json({
                    status: "Cancel Friendship"
                });
            } else if ( result.rows[0].sender_id == reciever ) {
                res.json({
                    status: "Accept Friendship"
                });
            }
        }).catch(err => {
                console.log('friendStatus ERROR:', err);
        });
    }
});//friends/:user_id" close.
////////////////// POST "/friends" ////////////////
app.post("/friends", (req, res) => {
    console.log("this is req.body POST button:", req.body.status);
    let reciever = req.body.user_id;
    let sender = req.session.userId;
    let buttonStatus = req.body.status;
    console.log("buttonStatus POST:", buttonStatus);
    if ( buttonStatus == "Start Friendship" ) {
        db.friendRequest(sender, reciever)
         .then(result => {
             res.json({
                 status: "Cancel Request"
             });
         }).catch(err => {
                 console.log('friendRequest ERROR:', err);
         });
    } else if ( buttonStatus == "Accept Friendship") {
        db.acceptFriendRequest(sender, reciever)
         .then(result => {
             res.json({
                 status: "Cancel Friendship"
             });
         }).catch(err => {
                 console.log('acceptFriendRequest ERROR:', err);
         });
    } else if ( buttonStatus == "Cancel Friendship" ) {
        db.deleteRequest(sender, reciever)
         .then(result => {
             res.json({
                 status: "Start Friendship"
             });
         }).catch(err => {
                 console.log('deleteRequest ERROR:', err);
         });
    }
});//"/friends" close.
/////////////////////// GET /users /////////
app.post("/users", (req, res) => {
    //console.log("/users", req.body.search);
    db.searchUsers(req.body.search)
        .then(result => {
            console.log('this is result selectUsers', result);
            res.json({
                users: result.rows
            });
        })
        .catch(err => {
            console.log('selectUsers ERROR:', err);
            res.json({
                error: "USER WAS NOT FOUND"
            });
        });
});//selectUsers close.
//////////////// GET log out //////////////
app.get('/logout', (req,res) => {
    req.session = null;
    res.redirect('/welcome');
});//logout close.
//////////////// GET * //////////////
app.get("*", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});//* close.

app.listen(8080, function() {console.log("I'm listening.");});
