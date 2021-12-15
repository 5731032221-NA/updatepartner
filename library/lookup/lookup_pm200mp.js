const config = require('../config');
const pool = require('node-jt400').pool(config);

//router.get('/:MBCODE', function (req, res) {
module.exports.lookup = (async function (req, res, dtf, PNNUM,PNID) {

    //var date_str = '';
    //var today = new Date();
    //date_str = today.getFullYear().toString() + ((today.getMonth() + 1) < 10 ? '0' : '').toString() + (today.getMonth() + 1).toString() + (today.getDate() < 10 ? '0' : '').toString() + today.getDate();
    var date_str = dtf.substr(0, 8);


    console.log(req.params.CUST_ID);
    var stmt = "select * from MBRFLIB/PM200MP where PNNUM='" + PNNUM + "' and PNID='" + PNID + "'";
    result = await pool.query(stmt)

    console.log(result.length);
    console.log(result);

    if (result.length > 0) {

        return true;
    }
    else {
        res.status(200).json({
            "RESP_SYSCDE": 200,
            "RESP_DATETIME": dtf,
            "RESP_CDE": 301,
            "RESP_MSG": "Not success, No record in Cobrand"
        });
        res.end();
    }



});

