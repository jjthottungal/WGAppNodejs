//Package Declaration
const { poolPromise,sql } = require('./dbconfig');


sql.valueHandler.set(sql.TYPES.Float, (value) => value*1.0);
sql.valueHandler.set(sql.TYPES.Int, (value) => value*1.0);


//Cheetukali Summary
async function cheetukaliSummary() {
    try {
        let pool = await poolPromise;
        let result = await pool.request()
        .execute('WG_CheetukaliList_Summary');
        
        if (result)
            return result.recordsets;
        else
            return null    
    }
    catch (err) {
        return err.message;
    }
}

//Cheetukali Summary
async function cheetukaliFamilySummary() {
    try {
        let pool = await poolPromise;
        let result = await pool.request()
        .execute('WG_CheetukaliList_Family_Summary');
        
        if (result)
            return result.recordsets;
        else
            return null    
    }
    catch (err) {
        return err.message;
    }
}

//Cheetukali List
async function cheetukaliList() {
    try {
        let pool = await poolPromise;
        let result = await pool.request()
        .execute('WG_CheetukaliList');
        
        if (result)
            return result.recordsets;
        else
            return null    
    }
    catch (err) {
        return err.message;
    }
}

//Cheetukali List
async function cheetukaliDetailsAll() {
    try {
        let pool = await poolPromise;
        let result = await pool.request()
        //.output('amount',sql.Decimal(5,2))
        .execute('WG_CheetukaliDetailsAll');
        console.log(result);
        if (result)
            return result.recordsets;
        else
            return null    
    }
    catch (err) {
        return err.message;
    }
}

//Cheetukali Deatails by ID
async function cheetukaliDetails(wgId) {
    try {
        let pool = await poolPromise;
        let result = await pool.request()
        .input('wg_ID',sql.Int,wgId)
        .execute('WG_CheetukaliDetails');
         
        if (result.recordset.length !== 0)
            return result.recordsets;
        else
            return null    
    }
    catch (err) {
        return err.message;
    }
}

//User List
async function userList(type) {
    try {
        let pool = await poolPromise;
        let result = await pool.request()
        .input('type',sql.VarChar,type)
        .execute('WG_UserList');
        
        if (result.recordset.length !== 0)
            return result.recordsets;
        else
            return null     
    }
    catch (err) {
        return err.message;
    }
}


//Login
async function WgLogin(UserID,Password) {
    try {
        let pool = await poolPromise;
        let result = await pool.request()
        .input('UserID',sql.VarChar,UserID)
        .input('Password',sql.VarChar,Password)
        .execute('WG_Login');

        if (result.recordset.length !== 0)
            return result.recordsets;
        else
            return null     
    }
    catch (err) {
        return err.message;
    }
}


//CheetukaliListGroupByMonth
async function cheetukaliListGroupByMonth() {
    try {
        let pool = await poolPromise;
        let result = await pool.request()
        .execute('WG_CheetukaliListMonthly_json');

        if (result.recordset.length !== 0)
            return result.recordset;
        else
            return null     
    }
    catch (err) {
        return err.message;
    }
}

//addEvent
async function addEvent(bodyjsonstring) {
    try {

        let pool = await poolPromise;
        let result = await pool.request()
        .input('json',sql.NVarChar(2048),bodyjsonstring)
        .output('RowCount',sql.Int)
        .execute('WG_AddEvent');

        if ( result)
            return result.output.RowCount;
        else
            return null     
    }
    catch (err) {
        return err.message;
    }
}

//addWinner
async function addWinner(bodyjsonstring) {
    try {

        let pool = await poolPromise;
        let result = await pool.request()
        .input('json',sql.NVarChar(2048),bodyjsonstring)
        .output('RowCount',sql.Int)
        .execute('WG_AddWinner');

        if ( result)
            return result.output.RowCount;
        else
            return null     
    }
    catch (err) {
        return err.message;
    }
}

//delWinner
async function delWinner(bodyjsonstring) {
    try {

        let pool = await poolPromise;
        let result = await pool.request()
        .input('json',sql.NVarChar(2048),bodyjsonstring)
        .output('RowCount',sql.Int)
        .execute('WG_DelWinner');

        if ( result)
            return result.output.RowCount;
        else
            return null     
    }
    catch (err) {
        return err.message;
    }
}

//delEvent
async function delEvent(wgid) {
    try {

        let pool = await poolPromise;
        let result = await pool.request()
        .input('wgid',sql.Int,wgid)
        .output('RowCount',sql.Int)
        .execute('WG_DelEvent');

        if ( result)
            return result.output.RowCount;
        else
            return null     
    }
    catch (err) {
        return err.message;
    }
}

module.exports = {
    cheetukaliSummary: cheetukaliSummary,
    cheetukaliFamilySummary: cheetukaliFamilySummary,
    cheetukaliList: cheetukaliList,
    cheetukaliDetailsAll: cheetukaliDetailsAll,
    cheetukaliDetails: cheetukaliDetails,
    userList: userList,
    WgLogin: WgLogin,
    cheetukaliListGroupByMonth: cheetukaliListGroupByMonth,
    addEvent: addEvent,
    addWinner: addWinner,
    delWinner: delWinner,
    delEvent: delEvent

}