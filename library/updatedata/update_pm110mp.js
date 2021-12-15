const config = require('../config');
const pool = require('node-jt400').pool(config);

module.exports.update = (async function (req, res, dtf, PNNUM, PNID) {

    var village = '';
    var floor = '';
    var soi = '';
    var contacthome = '';
    if (typeof req.body.ADD_VILLAGE != 'undefined') {
        village = req.body.ADD_VILLAGE;
    }

    if (typeof req.body.ADD_FLOOR != 'undefined') {
        floor = req.body.ADD_FLOOR;
    }

    if (typeof req.body.ADD_SOI != 'undefined') {
        soi = req.body.ADD_SOI;
    }
    if (typeof req.body.CONTACT_HOME != 'undefined') {
        contacthome = req.body.CONTACT_HOME;
    }
    //router.get('/:MBID/:MBTNAM/:MBTSUR', function (req, res) {
    var update_stmt = "update MBRFLIB/PM110MP ";
    update_stmt += " set TH_NAME=?,TH_SURNAM=?,EN_TITLE=?,EN_NAME=?,EN_SURNAM=?,MBBIRH=?,DE_NTNL=?,MBSEX=?,MBHSTS=?,MBCHIL=?,MBJOB=?,ADD_HOUSE=?,ADD_VILLA=?,MBFLR=?,ADD_SOI=?,ADD_ROAD=?,AD_SUBDIS=?,ADD_DISTR=?,ADD_PROVI=?,ADD_POST=?,CT_MOBILE=?,CT_HOME=?,CT_EMAIL=?";
    update_stmt += " where PNNUM='" + PNNUM + "' and PNID='" + PNID + "'";
    var update_params = [
            req.body.DEMO_TH_NAME //MBTNAM
            , req.body.DEMO_TH_SURNAME //MBTSUR
            , req.body.DEMO_EN_TITLE //MBETLE
            , req.body.DEMO_EN_NAME //MBENAM
            , req.body.DEMO_EN_SURNAME //MBESUR
            , req.body.DEMO_DOB //MBBIRH
            , req.body.DEMO_NTNL //DE_NTNL
            , req.body.DEMO_GENDER //MBSEX
            , req.body.DEMO_MRTLSTS //MBHSTS
            , req.body.DEMO_HAVE_KIDS //MBCHIL
            , req.body.DEMO_OCCUP //MBJOB
            , req.body.ADD_HOUSE_NUM //MBHNO
            , village //MBHVIL
            , floor //MBFLR
            , soi //MBHSOI
            , req.body.ADD_ROAD //MBHRD
            , req.body.ADD_SUB_DISTRICT //MBHPFT
            , req.body.ADD_DISTRICT //MBHBOR
            , req.body.ADD_PROVINCE //MBHPRV
            , req.body.ADD_POSTAL_CODE //MBHPOS
            , contacthome //MBHTEL
            , req.body.CONTACT_MOBILE //MBPTEL
            , req.body.CONTACT_EMAIL //MBEMAIL
        ];
        console.log(update_params);
        var result = await pool.update(update_stmt, update_params)

        console.log(result.length);
        console.log(result);

        if (result == 1) {
            return true;
        } else {
            res.status(200).json({
                "RESP_SYSCDE": 200,
                "RESP_DATETIME": dtf,
                "RESP_CDE": 500,
                "RESP_MSG": "Not success, update fail(pm110mp)"
            });
            res.end();
        }
    




});


