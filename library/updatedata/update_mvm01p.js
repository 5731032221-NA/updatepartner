const config = require('../config');
const pool = require('node-jt400').pool(config);


module.exports.update = (async function (req, res, dtf, MBCODE, mvm01p) {
    //router.get('/:MBID/:MBTNAM/:MBTSUR', function (req, res) {


    
    /*if (typeof req.body.CONTACT_HOME != 'undefined') {
        contacthome = req.body.CONTACT_HOME;
    }
*/


    var update_stmt = "update MBRFLIB/MVM01P ";
    update_stmt += " set MBHNO=?,MBHVIL=?,MBFLR=?,MBHSOI=?,MBHRD=?,MBHPFT=?,MBHBOR=?,MBHPRV=?,MBHPOS=?,MBHTEL=?,MBPTEL=?,MBEMAIL=?";
    update_stmt += " where MBCODE='" + MBCODE + "'";
    var update_params = await update(mvm01p, req);
    console.log(update_stmt);
    console.log(update_params);
    

    
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
            "RESP_MSG": "Not success, update fail(mvm01p)"
        });
        res.end();
    }




});

async function update( mvm01p, req) {
    var contacthome = await req.body.CONTACT_HOME;
    var CONTACT_MOBILE = await req.body.CONTACT_MOBILE;
    var CONTACT_EMAIL = await req.body.CONTACT_EMAIL;
    var ADD_HOUSE_NUM = await req.body.ADD_HOUSE_NUM;
    var ADD_ROAD = await req.body.ADD_ROAD;
    var ADD_SUB_DISTRICT = await req.body.ADD_SUB_DISTRICT;
    var ADD_DISTRICT = await req.body.ADD_DISTRICT;
    var ADD_PROVINCE = await req.body.ADD_PROVINCE;
    var ADD_POSTAL_CODE = await req.body.ADD_POSTAL_CODE;

    var village = await '';
    var floor = await '';
    var soi = await '';
    //var contacthome = '';
    if (typeof req.body.ADD_VILLAGE != 'undefined') {
        village = req.body.ADD_VILLAGE;
    }

    if (typeof req.body.ADD_FLOOR != 'undefined') {
        floor = req.body.ADD_FLOOR;
    }

    if (typeof req.body.ADD_SOI != 'undefined') {
        soi = req.body.ADD_SOI;
    }

    if (contacthome == '027777777' || CONTACT_MOBILE == '027777777') {
        //Don't update Mobile 
        CONTACT_MOBILE = mvm01p.MBPTEL;
        contacthome = mvm01p.MBHTEL;

        //Don't update Email
        CONTACT_EMAIL = mvm01p.MBEMAIL;
        ADD_HOUSE_NUM = mvm01p.MBHNO;

        //Don't update Address
        ADD_ROAD = mvm01p.MBHRD;
        ADD_SUB_DISTRICT = mvm01p.MBHPFT;
        ADD_DISTRICT = mvm01p.MBHBOR;
        ADD_PROVINCE = mvm01p.MBHPRV;
        ADD_POSTAL_CODE = mvm01p.MBHPOS;
        village = mvm01p.MBHVIL;
        floor = mvm01p.MBFLR;
        soi = mvm01p.MBHSOI;

        return [ADD_HOUSE_NUM, village, floor, soi, ADD_ROAD, ADD_SUB_DISTRICT, ADD_DISTRICT, ADD_PROVINCE, parseInt(ADD_POSTAL_CODE), contacthome, CONTACT_MOBILE, CONTACT_EMAIL];

        
    } else if (contacthome == '028888888' || CONTACT_MOBILE == '028888888' || contacthome == '888888888' || CONTACT_MOBILE == '888888888') {

        //Don't update Mobile 
        CONTACT_MOBILE = mvm01p.MBPTEL;
        contacthome = mvm01p.MBHTEL;
        //Email
        if (mvm01p.MBEMAIL != '') {
            CONTACT_EMAIL = mvm01p.MBEMAIL;
        }
        //Address

        if (mvm01p.MBHNO != '') {
            ADD_HOUSE_NUM = mvm01p.MBHNO;
        }

        if (mvm01p.MBHVIL != '') {
            village = mvm01p.MBHVIL;
        }

        if (mvm01p.MBFLR != '') {
            floor = mvm01p.MBFLR;
        }

        if (mvm01p.MBHSOI != '') {
            soi = mvm01p.MBHSOI;
        }

        if (mvm01p.MBHRD != '') {
            ADD_ROAD = mvm01p.MBHRD;
        }

        if (mvm01p.MBHPFT != '') {
            ADD_SUB_DISTRICT = mvm01p.MBHPFT;
        }

        if (mvm01p.MBHBOR != '') {
            ADD_DISTRICT = mvm01p.MBHBOR;
        }
        if (mvm01p.MBHPRV != '') {
            ADD_PROVINCE = mvm01p.MBHPRV;
        }

        if (mvm01p.MBHPOS != 0) {
            ADD_POSTAL_CODE = mvm01p.MBHPOS;
        }

        return [ADD_HOUSE_NUM, village, floor, soi, ADD_ROAD, ADD_SUB_DISTRICT, ADD_DISTRICT, ADD_PROVINCE, parseInt(ADD_POSTAL_CODE), contacthome, CONTACT_MOBILE, CONTACT_EMAIL];
        
    }
    else {
        //Mobile
        if (mvm01p.MBPTEL != '') {
            CONTACT_MOBILE = mvm01p.MBPTEL;
        }
        if (mvm01p.MBHTEL != '') {
            contacthome = mvm01p.MBHTEL;
        }

        //Email
        if (mvm01p.MBEMAIL != '') {
            CONTACT_EMAIL = mvm01p.MBEMAIL;
        }
        //Address
        if (mvm01p.MBHNO != '') {
            ADD_HOUSE_NUM = mvm01p.MBHNO;
        }

        if (mvm01p.MBHVIL != '') {
            village = mvm01p.MBHVIL;
        }

        if (mvm01p.MBFLR != '') {
            floor = mvm01p.MBFLR;
        }

        if (mvm01p.MBHSOI != '') {
            soi = mvm01p.MBHSOI;
        }

        if (mvm01p.MBHRD != '') {
            ADD_ROAD = mvm01p.MBHRD;
        }

        if (mvm01p.MBHPFT != '') {
            ADD_SUB_DISTRICT = mvm01p.MBHPFT;
        }

        if (mvm01p.MBHBOR != '') {
            ADD_DISTRICT = mvm01p.MBHBOR;
        }
        if (mvm01p.MBHPRV != '') {
            ADD_PROVINCE = mvm01p.MBHPRV;
        }

        if (mvm01p.MBHPOS != 0) {
            ADD_POSTAL_CODE = mvm01p.MBHPOS;
        }
        return [ADD_HOUSE_NUM, village, floor, soi, ADD_ROAD, ADD_SUB_DISTRICT, ADD_DISTRICT, ADD_PROVINCE, parseInt(ADD_POSTAL_CODE), contacthome, CONTACT_MOBILE, CONTACT_EMAIL];

        
    }
}





