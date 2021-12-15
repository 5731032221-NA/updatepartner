
module.exports.getdatetime = (function () {


	//var dt = new Date();
        //dt.setHours(dt.getHours() +7);
        //dt = dt.toISOString();
	var dt = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString();

	var dv = dt.substring(0, 10);

	var date_v = dv.substring(0, 4) + dv.substring(5, 7) + dv.substring(8, 10);


	//logger.debug('Date_V:', date_v);

	var tv = dt.substring(11, 19);
	var hp = tv.substring(0, 2);
	var mp = tv.substring(3, 5);
	var sp = tv.substring(6, 8);

	//console.log('Time-7:', hp);


	//console.log('Time+7:', hp);

	/*if (hp > 23) {

		hp = hp - 24;

	}

	if (hp < 9) {

		hp = '0' + hp.toString();
	} else {

		hp = hp.toString();
	}*/

	var time_v = hp + mp + sp;
	//logger.debug('Time_V:', time_v);

	var dtf = date_v + time_v;
	return dtf;
})
