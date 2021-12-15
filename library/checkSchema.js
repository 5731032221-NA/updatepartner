const Joi = require('joi');


const _mandatory_template = {
    "updatepassport": Joi.object().keys({
        PARTNER_ID: Joi.any().required(),
        PARTNER_NBR: Joi.any().required(),
        DEMO_TH_TITLE: Joi.any().required(),
        DEMO_TH_NAME: Joi.any().required(),
        DEMO_TH_SURNAME: Joi.any().required(),
        DEMO_EN_TITLE: Joi.any().required(),
        DEMO_EN_NAME: Joi.any().required(),
        DEMO_EN_SURNAME: Joi.any().required(),
        DEMO_DOB: Joi.any().required(),
        DEMO_NTNL: Joi.any().required(),
        DEMO_GENDER: Joi.any().required(),
        DEMO_MRTLSTS: Joi.any().required(),
        DEMO_HAVE_KIDS: Joi.any().required(),
        DEMO_OCCUP: Joi.any().required(),
        ADD_HOUSE_NUM: Joi.any().required(),
        ADD_VILLAGE: Joi.any().optional(),
        ADD_FLOOR: Joi.any().optional(),
        ADD_SOI: Joi.any().optional(),
        ADD_ROAD: Joi.any().required(),
        ADD_SUB_DISTRICT: Joi.any().required(),
        ADD_DISTRICT: Joi.any().required(),
        ADD_PROVINCE: Joi.any().required(),
        ADD_POSTAL_CODE: Joi.any().required(),
        CONTACT_MOBILE: Joi.any().required(),
        CONTACT_HOME: Joi.any().optional(),
        CONTACT_EMAIL: Joi.any().required(),
        MCARD_FLAG: Joi.any().optional()
    })
};


const _template = {
    "updatepassport": Joi.object().keys({
        PARTNER_ID: Joi.string().allow('').max(5),
        PARTNER_NBR: Joi.string().allow('').max(50),
        DEMO_TH_TITLE: Joi.string().allow('').max(15),
        DEMO_TH_NAME: Joi.string().allow('').max(23),
        DEMO_TH_SURNAME: Joi.string().allow('').max(30),
        DEMO_EN_TITLE: Joi.string().allow('').max(10),
        DEMO_EN_NAME: Joi.string().allow('').max(20),
        DEMO_EN_SURNAME: Joi.string().allow('').max(30),
        DEMO_DOB: Joi.string().allow('').max(8),
        DEMO_NTNL: Joi.string().allow('').max(2),
        DEMO_GENDER: Joi.string().allow('').max(1),
        DEMO_MRTLSTS: Joi.string().allow('').max(1),
        DEMO_HAVE_KIDS: Joi.number().allow('').max(99),
        DEMO_OCCUP: Joi.string().allow('').max(1),
        ADD_HOUSE_NUM: Joi.string().allow('').max(12),
        ADD_VILLAGE: Joi.string().allow('').max(23),
        ADD_FLOOR: Joi.string().allow('').max(10),
        ADD_SOI: Joi.string().allow('').max(20),
        ADD_ROAD: Joi.string().allow('').max(20),
        ADD_SUB_DISTRICT: Joi.string().allow('').max(15),
        ADD_DISTRICT: Joi.string().allow('').max(15),
        ADD_PROVINCE: Joi.string().allow('').max(15),
        ADD_POSTAL_CODE: Joi.number().allow('').max(99999),
        CONTACT_MOBILE: Joi.string().allow('').max(12),
        CONTACT_HOME: Joi.string().allow('').max(20),
        CONTACT_EMAIL: Joi.string().allow('').max(40),
        MCARD_FLAG: Joi.string().allow('').max(50)
    })

}
// /validation/schema/:SCHEMANO
//router.post('/:SCHEMANO', function (req, res,SCHEMANO) {
module.exports.checkSchema = (async function (req, res, dtf, SCHEMANO) {
    console.log('check schema 1');
    /* if (SCHEMANO == 'REGISTER') {
         res.status(200);
         res.end();
     }*/
    let result = Joi.validate(req.body, _mandatory_template[SCHEMANO]);
    if (result.error === null) {
        let result = Joi.validate(req.body, _template[SCHEMANO]);
        if (result.error == null) {
            //res.status(200).send('Success');
            return true;
        } else {
            console.log(result);
            /* res.json({
                 "reason": "Invalid Format : " + result.error.details[0].context.key
             });*/
            //res.json(result.error.details[0].context.key);
            res.status(200);
            res.json({
                "RESP_SYSCDE": 200,
                "RESP_DATETIME": dtf,
                "RESP_CDE": 402,
                "RESP_MSG": "Not success, Invalid Parameter " + result.error.details[0].context.key
            });
            return false;
        }
    } else {
        console.log(result);
        //res.status(401).send('Missing Required Field');
        res.status(200);
        //res.json(result.error.details[0].context.key);
        res.json({
            "RESP_SYSCDE": 200,
            "RESP_DATETIME": dtf,
            "RESP_CDE": 401,
            "RESP_MSG": "Not success, Missing Parameter " + result.error.details[0].context.key
        });
        return false;
    }
});


