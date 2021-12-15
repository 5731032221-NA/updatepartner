const config = require('../config');
const pool = require('node-jt400').pool(config);

module.exports.lookup = (async function (req, res, dtf, CUST_ID, PASSPRT) {
    //router.get('/:CUST_ID/:PASSPRT', function (req, res) {

    //var date_str = '';
    //var today = new Date();
    //date_str = today.getFullYear().toString() + ((today.getMonth() + 1) < 10 ? '0' : '').toString() + (today.getMonth() + 1).toString();
    var date_str = dtf.substr(0, 6);

    console.log(CUST_ID);
    console.log(PASSPRT);
    var stmt = "select * from (select ROW_NUMBER() OVER (ORDER BY  MVM01P.MBCODE) AS ROWNUM,MVM01P.* from MBRFLIB/MVM01P MVM01P where (MVM01P.MBID = '" + CUST_ID + "' OR MVM01P.MBID = '" + PASSPRT + "') and MVM01P.MBMEMC != 'AT' and MVM01P.MBEXP >= " + date_str + " and MVM01P.MBCODE not in (select MBCODE from MBRFLIB/MCRTA28P) and MVM01P.MBDAT = (SELECT MAX(MBDAT) FROM MBRFLIB/MVM01P P2 WHERE MVM01P.MBID = P2.MBID AND P2.MBMEMC != 'AT' )) as tbl WHERE tbl.ROWNUM BETWEEN 1 AND 1";
    result = await pool.query(stmt)
    console.log(result.length);
    console.log(result);

    if (result.length > 0) {
        return result;
    }
    else {
        res.status(200).json({
            "RESP_SYSCDE": 200,
            "RESP_DATETIME": dtf,
            "RESP_CDE": 302,
            "RESP_MSG": "Not success, No record in Mcard"
        });
        res.end();
    }

});



