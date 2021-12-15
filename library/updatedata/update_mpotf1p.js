const config = require('../config');
const pool = require('node-jt400').pool(config);

module.exports.update = (async function (req, res, dtf, MBCODE, mvm01p) {
        var date_str = dtf.substr(0, 8);

        var contacthome = await req.body.CONTACT_HOME;
        var CONTACT_MOBILE = await req.body.CONTACT_MOBILE;



        if (typeof req.body.CONTACT_HOME != 'undefined') {
                contacthome = req.body.CONTACT_HOME;
        }
        var update_stmt = "update MBRFLIB/MPOTF1P ";
        update_stmt += " set MBHTEL=?,MBPTEL=?";
        update_stmt += " where MBCODE='" + MBCODE + "' and MBDAT='" + parseInt(date_str) + "'";

        if (contacthome == '027777777' || CONTACT_MOBILE == '027777777' || contacthome == '028888888' || CONTACT_MOBILE == '028888888' || contacthome == '888888888' || CONTACT_MOBILE == '888888888') {
                //Don't update Mobile 
                CONTACT_MOBILE = mvm01p.MBPTEL;
                contacthome = mvm01p.MBHTEL;

                var update_params = [contacthome, CONTACT_MOBILE];

                var result = await pool.update(update_stmt, update_params);

                console.log(result.length);
                console.log(result);
		
                if (result == 1) {
                        return true;
                } else {
                        res.status(200).json({
                                "RESP_SYSCDE": 200,
                                "RESP_DATETIME": dtf,
                                "RESP_CDE": 500,
                                "RESP_MSG": "Not success, Update fail(MPOTF1P)"
                        });
                        res.end();
                }
        } else {
                if (mvm01p.MBPTEL != '') {
                        CONTACT_MOBILE = mvm01p.MBPTEL;
                }
                if (mvm01p.MBHTEL != '') {
                        contacthome = mvm01p.MBHTEL;
                }

                var update_params = [contacthome, CONTACT_MOBILE];

                var result = await pool.update(update_stmt, update_params);

                console.log(result.length);
                console.log(result);
		
                if (result == 1) {
                        return true;
                } else {
                        res.status(200).json({
                                "RESP_SYSCDE": 200,
                                "RESP_DATETIME": dtf,
                                "RESP_CDE": result,
                                "RESP_MSG": "Not success, Update fail(MPOTF1P)"
                        });
                        res.end();
                }
        }



});



