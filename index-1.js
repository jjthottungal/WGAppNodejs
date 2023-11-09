require('dotenv').config();
//----------------------------------------
const dboperations = require('./dboperations');
const { encryptData, decryptData } = require('./aes_encryption.js');
const { access_token } = require('./config.js');
const jwt = require('jsonwebtoken');

const express = require('express');
const app = express();
//const router = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');

//Declare usage
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
//app.use('/api', router);


//Middleware routines
app.use((req, res, next) => {
    //Enable CORS
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', '*')
        return res.status(200).json({});
    }
    next()
})

function authenticationToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, access_token, (err, payload) => {
        if (err) return res.sendStatus(403);
        //req.payload = payload;
        next();

    })
}


//----Routers to call WebApi
//Cheetukali Summary
app.get('/api/CheetukaliSummary', authenticationToken, (req, res) => {
    dboperations.cheetukaliSummary().then(result => {
        const data = JSON.stringify(result[0]);
        //console.log(data);
        const encryptedData = encryptData(data);
        //console.log({ encryptedData });
        //res.json(result[0]);
        res.json({ encryptedData });
    })
});

//Cheetukali Family Summary
app.get('/api/CheetukaliFamilySummary', (req, res) => {
    dboperations.cheetukaliFamilySummary().then(result => {
        const data = JSON.stringify(result[0]);
        const encryptedData = encryptData(data);
        res.json({ encryptedData });
        //res.json(result[0]);
    })
});

//Cheetukali List
app.get('/api/CheetukaliList', (req, res) => {
    dboperations.cheetukaliList().then(result => {
        res.json(result[0]);
    })
});

//Cheetukali Deatils All
app.get('/api/CheetukaliDetailsAll', (req, res) => {
    dboperations.cheetukaliDetailsAll().then(result => {
        res.json(result[0]);
    })

});

//Cheetukali Deatils by ID
app.get('/api/CheetukaliDetails', (req, res) => {
    dboperations.cheetukaliDetails(req.query.wgId).then(result => {
        if (result)
            res.json(result[0]);
        else
            res.status(404).json(`Play event with Id = ${req.query.wgId} not found`);
    })
});

//User List
app.get('/api/UserList', (req, res) => {
    dboperations.userList(req.query.type).then(result => {
        if (result)
            res.json(result[0]);
        else
            res.status(404).json(`User type with type=${req.query.type}  not found`);
    })
});

//Login
app.post('/api/Login', (req, res) => {
    dboperations.WgLogin(req.body.UserID, req.body.Password).then(result => {

        if (result) {
            //User is authenticated and create JWT
            const user = { name: req.body.UserID };
            const accessToken = jwt.sign(user, access_token);
            let resultObj = result[0][0];
            resultObj = { ...resultObj, jwt_token: 'bearer ' + accessToken };

            res.json([resultObj]);
            //res.json(result[0]);
        }
        else {
            res.status(404).json('Invalid User');
        }
    })
});

//CheetukaliListGroupByMont
app.get('/api/CheetukaliListGroupByMonth', (req, res) => {
    dboperations.cheetukaliListGroupByMonth().then(result => {
        res.json(result[0]);
    })

});

//AddEvent
app.post('/api/AddEvent', (req, res) => {
    const bodyjsonstring = JSON.stringify(req.body);
    dboperations.addEvent(bodyjsonstring).then(result => {

        if (result) {
            res.status(201).json('Event Created');
        }
        else {
            res.status(400).json('Insert Error');
        }
    })

});

//AddWinner
app.post('/api/AddWinner', (req, res) => {
    const bodyjsonstring = JSON.stringify(req.body);
    dboperations.addWinner(bodyjsonstring).then(result => {

        if (result) {
            res.status(201).json('Winner Created');
        }
        else {
            res.status(400).json('Insert Error');
        }
    })

});

//DelWinner
app.post('/api/DelWinner', (req, res) => {
    const bodyjsonstring = JSON.stringify(req.body);
    dboperations.delWinner(bodyjsonstring).then(result => {

        if (result) {
            res.status(200).json('Winner Deleted');
        }
        else {
            res.status(404).json('Delete Error');
        }
    })

});

//DelEvent
app.post('/api/DelEvent', (req, res) => {
    dboperations.delEvent(req.query.wgId).then(result => {

        if (result) {
            res.status(200).json('Event Deleted');
        }
        else {
            res.status(404).json('Delete Error');
        }
    })

});

//------------------------// Not to be copied to Server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Order API is runnning at ${port}`));
