function computeCalc(arr){

	var totalItems=arr.data.length;
	//alert(totalItems);
	for(var i=0;i<totalItems;i++){
			//high - preclose
			arr.data[i][16]=Number((arr.data[i][6]-arr.data[i][4])/arr.data[i][6]*100).toFixed(2);
			arr.data[i][17]=Number((arr.data[i][7]-arr.data[i][4])/arr.data[i][4]*100).toFixed(2);
			arr.data[i][18]=Number((arr.data[i][8]-arr.data[i][4])/arr.data[i][4]*100).toFixed(2);
	}
	return arr;
}

var getColorForPercentage = function(pct) {
	var cfac=(Math.abs(pct)/5);
	var ccode=0;
	if(pct<0)
		ccode='rgba(255,0,0,'+cfac+')';
	else
		ccode='rgba(0,255,0,'+cfac+')';

	return ccode;
}
		



		  
$(function()
{

$( "#datepicker" ).datepicker( {dateFormat: "ddmmyy"});
$( "#datepicker2" ).datepicker( {dateFormat: "ddmmyy"});

$('#getbhav').click(function(e) {
		var str=$('#datepicker').val();
		var res = str.substr(0, 4) + str.substr(6, 2);
		var bhavurl="https://www.nseindia.com/archives/equities/bhavcopy/pr/PR"+res+".zip";
		
		 e.preventDefault();  //stop the browser from following
		window.location.href = bhavurl;
		
	    //alert( "Handler for .click() called." +bhavurl);
});








//To disable error alerts. Not recomended.
$.fn.dataTable.ext.errMode = 'none';


	
	function readBhavCSV(csvfile)
	
	
	{

		
		var table;
			
			Papa.parse(csvfile, {
				download: true,
				complete: function(results) {
				//console.log(results);
				results=computeCalc(results);
				table =	$('#example').DataTable( {

			"pageLength": 2000,
			// "scrollX": true,		
					
					
					
		data: results.data,
		//MKT,SERIES,SYMBOL,SECURITY,PREV_CL_PR,OPEN_PRICE,HIGH_PRICE,LOW_PRICE,CLOSE_PRICE,NET_TRDVAL,NET_TRDQTY,IND_SEC,CORP_IND,TRADES,HI_52_WK,LO_52_WK
		"columns": [
           
		   { title: results.data[0][0] },
            { title: results.data[0][1] },
            { title: results.data[0][2] },
            { title: results.data[0][3] },
            { title: "PREV CLOSE"  },
            { title: "OPEN" },
            { title: "HIGH" },
            { title: "LOW" },
            { title: "CLOSE" },
            { title: results.data[0][9] },
            { title: results.data[0][10] },
            { title: results.data[0][11] },
            { title: results.data[0][12] },
            { title: results.data[0][13] },
            { title: results.data[0][14] },
            { title: results.data[0][15] },
            { title: "high - preclose"},
            { title: "Low - preclose"},
            { title: "Change %"},
        ],
		
		
		"columnDefs": [ 
			{
				"targets": [ 0,9,11,12 ],
				"visible": false
			},			
		  {
			"targets": [ 2 ],
			"render": function ( data, type, full, meta ) {
				  return data+'<a target="_blank" href="https://www.google.com/finance?q=NSE%3A'+data+'">G</a>'+'<a target="_blank"  href="http://chartink.com/stocks/'+data+'.html">C</a>';
			}
		  },
		  {
			"targets": [ 16,17 ],
			"render": function ( data, type, full, meta ) {
				  return '<span style="background:'+getColorForPercentage(data)+'">'+data+'</span>';
			}
		  },
		  
		  {
			"type": "html-num-fmt", "targets": [8,10,13,16,17,18],
			
		}
		  
		]
	} );
	
	yadcf.init(table, [
		{column_number : 1},
		{column_number : 8, filter_type: "range_number"},
		{column_number : 10, filter_type: "range_number"},
		{column_number : 13, filter_type: "range_number"},
		{column_number : 16, filter_type: "range_number"},
		{column_number : 17, filter_type: "range_number"}
	]);
    
	yadcf.exFilterColumn(table, [[1, 'EQ'], [8, {from: 50, to: 500}], [10, {from: 300000}]]); //pre filter several columns
	
	}
	});
	}
	
	
	
	
	
	$('#submit-parse').click(function() {
		var files = $('#files')[0].files;
		readBhavCSV(files[0]);
	});
	
	
	
	$('#loadbhav').click(function(e) {
		var str=$('#datepicker2').val();
		var res = str.substr(0, 4) + str.substr(6, 2);
		var bhavurl="uploaded/pd"+res+".csv";
		
		alert(bhavurl);
		readBhavCSV(bhavurl);
		
		
		 //e.preventDefault();  //stop the browser from following
		//window.location.href = bhavurl;	
	    //alert( "Handler for .click() called." +bhavurl);
	});


});