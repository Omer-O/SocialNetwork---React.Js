

function makeSpagethi() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('cooked Spagehti');
            resolve();
        }, 2000)
    })
}

function cookMeat() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('cooked Meat');
            resolve();
        }, 1500)
    })
}

function makeSauce() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('cooked Sauce');
            resolve();
        }, 1000)
    })
}

//old way to run an async functions:
function makeBolognese() {
    makeSpagethi().then (() => {
        cookMeat().then(() => {
            makeSauce().then(() => {

            })
        })
    })
}

async function makeBolognese() {
    await makeSpagethi();
    await cookMeat();
    await makeSauce();
}

//we can also do the same with try and catch:

async function makeBolognese() {
    try {
        await makeSpagethi();
        await cookMeat();
        await makeSauce();
    } catch (e) {
        console.log('this is error', e);
    }
}

// now we will call the functions without the await key word
// before them:
async function makeBolognese() {
    const spagetiProm =  makeSpagethi();
    const meatProm = cookMeat();
    const sauceProm = makeSauce();

// way #1 = recieve all of the functions in the same time,
// regardless when each one is finished.
    return Promise.all([ spagetiProm, meatProm, sauceProm ]);
// way #2 = recieve all of the functions in the same time,
// regardless when each one is finished.
    return {
        spagethi: await spagetiProm,
        meat: await meatProm,
        sauce: await sauceProm
    }
}
//now we will change the get.post of registration:

app.post('/registration', async (req, res) => {
        const { first, last, email, password } = req.body;

        const hash = bc.hashPassword(password);
        const userData = db.addUser(first, last, email, hash);

        req.session.userId = userData.rows[0].id;
        res.json({
            userId: userData.rows[0].id,
            success: true
        });
    }
});

app.post('/registration', async (req, res) => {
    const { first, last, email, password } = req.body;
    try {
        const hash = bc.hashPassword(password);
        const userData = db.addUser(first, last, email, hash);

        req.session.userId = userData.rows[0].id;
        res.json({
            userId: userData.rows[0].id,
            success: true
        });
    } catch (e) {
        console.log('ERROR');
    }
});
