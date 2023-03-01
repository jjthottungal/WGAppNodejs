require('dotenv').config();
//----------------------------------------
const dboperations = require('./dboperations');

const express = require('express');
const app = express();
//const router = express.Router();
//const bodyParser = require('body-parser');
//const cors = require('cors');

//Declare usage
//app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json());
//app.use(cors());
app.use(express.json());
//app.use('/api', router);


//Middleware routine
app.use((req,res,next) => {
    //Enable CORS
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', '*')
        return res.status(200).json({});
    }
    next()
})


//----Routers to call WebApi
//Cheetukali Summary
app.get('/api/CheetukaliSummary', (req, res)  => {
    dboperations.cheetukaliSummary().then(result => {
        res.json(result[0]);
     })
});

//Cheetukali Family Summary
app.get('/api/CheetukaliFamilySummary', (req, res)  => {
    dboperations.cheetukaliFamilySummary().then(result => {
        res.json(result[0]);
     })
});

//Cheetukali List
app.get('/api/CheetukaliList', (req, res)  => {
    dboperations.cheetukaliList().then(result => {
        res.json(result[0]);
     })
});

//Cheetukali Deatils All
app.get('/api/CheetukaliDetailsAll', (req, res)  => {
    dboperations.cheetukaliDetailsAll().then(result => {
        res.json(result[0]);
     })
     
});

//Cheetukali Deatils by ID
app.get('/api/CheetukaliDetails', (req, res)  => {
    dboperations.cheetukaliDetails(req.query.wgId).then(result => {
        if (result)
            res.json(result[0]);
        else
            res.status(404).json(`Play event with Id = ${req.query.wgId} not found`);			  
     })
});

//User List
app.get('/api/UserList', (req, res)  => {
    dboperations.userList(req.query.type).then(result => {
        if (result)
            res.json(result[0]);
        else
            res.status(404).json(`User type with type=${req.query.type}  not found`);
     })
});

//Login
app.post('/api/Login', (req, res)  => {
    console.log(req.body);
    dboperations.WgLogin(req.body.UserID,req.body.Password).then(result => {
        if (result) {
            res.json(result[0]);
		}	
        else {
            res.status(404).json('Invalid User');
		}
     })
});

//CheetukaliListGroupByMonth
app.get('/api/CheetukaliListGroupByMonth', (req, res)  => {
    dboperations.cheetukaliListGroupByMonth().then(result => {
        res.json(result[0]);
     })
     
});

//AddEvent
app.post('/api/AddEvent', (req, res)  => {
    const bodyjsonstring = JSON.stringify(req.body);
    dboperations.addEvent(bodyjsonstring).then(result => {
        console.log(result);
        if (result) {
            res.status(201).json('Event Created');
		}	
        else {
            res.status(400).json('Insert Error');
		}
     })
     
});

//AddWinner
app.post('/api/AddWinner', (req, res)  => {
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
app.post('/api/DelWinner', (req, res)  => {
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
app.post('/api/DelEvent', (req, res)  => {
    dboperations.delEvent(req.query.wgId).then(result => {

        if (result) {
            res.status(200).json('Event Deleted');
		}	
        else {
            res.status(404).json('Delete Error');
		}
     })
     
});

//------------------------// Not to be copie to Server
const port = process.env.PORT;
app.listen(port); 
