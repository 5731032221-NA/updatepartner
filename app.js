const lookup_mvm01p = require('./library/lookup/lookup_mvm01p');
const lookup_country = require('./library/lookup/lookup_country');
const lookup_pm110mp = require('./library/lookup/lookup_pm110mp');
const lookup_pm200mp = require('./library/lookup/lookup_pm200mp');

const update_mvm01p = require('./library/updatedata/update_mvm01p');
const update_pm110mp = require('./library/updatedata/update_pm110mp');
const update_mpotf1p = require('./library/updatedata/update_mpotf1p');


const datetime = require('./library/datetime');
const schema = require('./library/checkSchema');

const express = require('express')

const app = express()
const bodyParser = require('body-parser')

app.listen(8103, function () {
    console.log('app listening on port 8103!');
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.post('/updatepartner', async function (req, res) {

    var dtf = await datetime.getdatetime();

    var custid = '';
    var mb = '';


    ///////////validate schema/////////////////
    // check schema
    let checkschema = await schema.checkSchema(req, res, dtf, "updatepassport");
    if (checkschema) {
        let lookupmember_pm110mp = await lookup_pm110mp.lookup(req, res, dtf, req.body.PARTNER_NBR, req.body.PARTNER_ID);
        if (lookupmember_pm110mp.length > 0) {
            console.log("lookup_pm110mp");
            let CUST_ID = await lookupmember_pm110mp[0].MBID;
            var bool = false;
            if (req.body.DEMO_NTNL == 'TH') {
                if (checkID(CUST_ID)) {
                    citizen = lookupmember_pm110mp[0].MBID
                    bool = true;
                }
            } else if (!req.body.DEMO_NTNL) {
                res.json({
		    "RESP_SYSCDE": 200,
                     "RESP_DATETIME": dtf,
                    "RESP_CDE": 401,
                    "RESP_MSG": "Not success, Missing Parameter DEMO_NTNL"
                });
                return;
            } else if (CUST_ID.length > 10) {
                res.json({
		    "RESP_SYSCDE": 200,
                     "RESP_DATETIME": dtf,
                    "RESP_CDE": 402,
                    "RESP_MSG": "Not success, Invalid Parameter CUST_ID"
                });
                return;
            } else if (typeof req.body.ADD_POSTAL_CODE != "number") {
                res.json({
		    "RESP_SYSCDE": 200,
                     "RESP_DATETIME": dtf,
                    "RESP_CDE": 402,
                    "RESP_MSG": "Not success, Invalid Parameter ADD_POSTAL_CODE"
                });
                return;
            } else {
                bool = true;
            }
            // DEMO_NTNL != 'TH'
            let country_name = await lookup_country.lookup(req, res, dtf, req.body.DEMO_NTNL);
            ctry = country_name[0].CNTRYCD3;
            mbnat_ = country_name[0].MBNAT;
            if (req.body.DEMO_NTNL == 'TH') {
                custid = lookupmember_pm110mp[0].MBID
            } else {
                custid = country_name[0].CNTRYCD3 + lookupmember_pm110mp[0].MBID
            }
            console.log(custid);

            let lookupmember_mvm01p = await lookup_mvm01p.lookup(req, res, dtf, custid, CUST_ID);
            ////////////// exist card //////////////////
            var mb =  lookupmember_mvm01p[0].MBCODE;
            let lookupmember_pm200mp = await lookup_pm200mp.lookup(req, res, dtf, req.body.PARTNER_NBR, req.body.PARTNER_ID);
            if (lookupmember_pm200mp) {
                if (lookupmember_mvm01p.length != 0 && bool) {
                    let updatepm110mp = await update_pm110mp.update(req, res, dtf, req.body.PARTNER_NBR, req.body.PARTNER_ID);
                    if (updatepm110mp == true) {
                        let updatempotf1p = await update_mpotf1p.update(req, res, dtf, mb, lookupmember_mvm01p[0]);
                        if (updatempotf1p == true) {
                            let updatemvm01p = await update_mvm01p.update(req, res, dtf, mb, lookupmember_mvm01p[0]);
                            if (updatemvm01p == true) {

                                res.json({
                                    "RESP_SYSCDE": 200,
                                    "RESP_DATETIME": dtf,
                                    "RESP_CDE": 200,
                                    "RESP_MSG": "Success",
                                    "MCARD_NUM": lookupmember_mvm01p[0].MBCODE,
                                    "CARD_TYPE": lookupmember_mvm01p[0].MBMEMC,
                                    "CARD_EXPIRY_DATE": lookupmember_mvm01p[0].MBEXP
                                });
                            }
                        }
                    }
                }else{
                    res.json({
                        "RESP_SYSCDE": 200,
                        "RESP_DATETIME": dtf,
                        "RESP_CDE": 402,
                    "RESP_MSG": "Not success, Invalid Parameter CUST_ID"
                    });
                }
            }
        }
    }
})




function checkID(custid) {
                        var ssn_ = custid;
                        var sum = 0;
                        console.log(ssn_);
                        if (ssn_.length != 13) {
                                console.log("Invalid Citizen ID - Length");
                                return false;
                        } else {
                                for (i = 0, sum = 0; i < 12; i++)
                                        sum += parseFloat(ssn_.charAt(i)) * (13 - i);
                                if ((11 - sum % 11) % 10 != parseFloat(ssn_.charAt(12))) {
                                        console.log("Invalid Citizen ID - Format");
                                        return false;
                                } else {
                                        console.log("Valid Citizen ID");                                        return true;
                                }
                        }
                }

