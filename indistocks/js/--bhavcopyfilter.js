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

$( "#datepicker" ).datepicker( {dateFormat: "ddMyy"});
//$( "#datepicker" ).datepicker( {dateFormat: "ddmmyy"});
$( "#datepicker2" ).datepicker( {dateFormat: "ddMyy"});

$('#getbhav').click(function(e) {
		//var str=$('#datepicker').val();
		//var res = str.toUpperCase() ;
		var selDate=$( "#datepicker" ).datepicker( "getDate" ).getDate();
		var monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN","JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
		var selYear=$( "#datepicker" ).datepicker( "getDate" ).getFullYear();
		var selMonth=monthNames[$( "#datepicker" ).datepicker( "getDate" ).getMonth()];
		
		var selOpt=$("input[name='section']:checked").val();
		//https://www.nseindia.com/content/historical/EQUITIES/2017/MAR/cm24Mar2017bhav.csv.zip
		//var bhavurl="https://www.nseindia.com/content/historical/EQUITIES/"+selYear+"/"+selMonth+"/cm"+res+"bhav.csv.zip";
		
		// e.preventDefault();  //stop the browser from following
		
		
		
		var bhavurl=""
		if(selOpt=="equity"){
			bhavurl='/get-nse-bhavcopy-csv.php?date='+selDate+"-"+selMonth+"-"+selYear;
			
		}else if(selOpt=="fno"){
			bhavurl='/get-fno-nse-bhavcopy-csv.php?date='+selDate+"-"+selMonth+"-"+selYear;
		}
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

				table =	$('#example').DataTable( {

			"pageLength": 2000,
			// "scrollX": true,		
					
					
					
		data: results.data,
		//SYMBOL,SERIES,OPEN,HIGH,LOW,CLOSE,LAST,PREVCLOSE,TOTTRDQTY,TOTTRDVAL,TIMESTAMP,TOTALTRADES,ISIN,
		"columns": [
           
	   	   { title: results.data[0][0] },
            { title: results.data[0][1] },
            { title: results.data[0][2] },
            { title: results.data[0][3] },
            { title: results.data[0][4] },
            { title: results.data[0][5] },
            { title: results.data[0][6] },
            { title: results.data[0][7] },
            { title: results.data[0][8] },
            { title: results.data[0][9] },
            { title: results.data[0][10] },
            { title: results.data[0][11] },
            { title: results.data[0][12] },
            { title: "high - open"},
            { title: "Low - open"},
            { title: "Change %"},
        ],
		
		
		"columnDefs": [ 
			{
				"targets": [ 9,10,12 ],
				"visible": false
			},			
		  {
			"targets": [ 0 ],
			"render": function ( data, type, full, meta ) {
				//console.log(full);
				  return data+'<a target="_blank" href="https://www.google.com/finance?q=NSE%3A'+data+'">G</a>'+'<a target="_blank"  href="http://chartink.com/stocks/'+data+'.html">C</a>';
			}
		  },
		    { //"high - open"
			//((high - open)/open)*100
			"targets": [ 13 ],
			"render": function ( data, type, full, meta ) {
				var val=(((Number(full[3])-Number(full[2]))/Number(full[2]))*100).toFixed(2);
				return '<span style="background:'+getColorForPercentage(val)+'">'+val+'</span>';
			}
		  }, 
		 
		 { //"low - open"
			//((low - open)/open)*100
		 
			"targets": [ 14 ],
			"render": function ( data, type, full, meta ) {
				var val=(((Number(full[4])-Number(full[2]))/Number(full[2]))*100).toFixed(2);
				return '<span style="background:'+getColorForPercentage(val)+'">'+val+'</span>';
			}
		  },
		 
		  { ////"Change %"
		  //((last - preclose)/preclose)*100
			"targets": [ 15 ],
			"render": function ( data, type, full, meta ) {
				var val=(((Number(full[6])-Number(full[7]))/Number(full[7]))*100).toFixed(2);
				return '<span style="background:'+getColorForPercentage(val)+'">'+val+'</span>';
			}
		  },
		 
		  
		  {
			"type": "html-num-fmt", "targets": [2,3,4,5,6,7,8,9,11,13,14,15],
			} 
		  
		]
	} );
	
	yadcf.init(table, [
		/*{column_number : 1},
		 {column_number : 5, filter_type: "range_number"}, */
		
		{
            column_number : 1, //close
            filter_container_id: 'external_filter_container_0'
        },
		{
            column_number : 5, //close
            filter_container_id: 'external_filter_container_1',
            filter_type: 'range_number'
        },
		
		{
            column_number : 8, //close
            filter_container_id: 'external_filter_container_2',
            filter_type: 'range_number'
        },
		
		{
            column_number : 11, //close
            filter_container_id: 'external_filter_container_3',
            filter_type: 'range_number'
        }
		
	]);
    
	yadcf.exFilterColumn(table, [[1, 'EQ'], [5, {from: 50, to: 500}], [11, {from: 10000}]]); //pre filter several columns
	
	}
	});
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

	function readFNOBhavCSV(csvfile)
	{

		var table;
			
			Papa.parse(csvfile, {
				download: true,
				complete: function(results) {

				table =	$('#example').DataTable( {

			"pageLength": 2000,
			// "scrollX": true,		
					
					
					
		data: results.data,
		//SYMBOL,SERIES,OPEN,HIGH,LOW,CLOSE,LAST,PREVCLOSE,TOTTRDQTY,TOTTRDVAL,TIMESTAMP,TOTALTRADES,ISIN,
		
		
		
		"columns": [
           
		   { title: results.data[0][0] },
            { title: results.data[0][1] },
            { title: results.data[0][2] },
            { title: results.data[0][3] },
            { title: results.data[0][4] },
            { title: results.data[0][5] },
            { title: results.data[0][6] },
            { title: results.data[0][7] },
            { title: results.data[0][8] },
            { title: results.data[0][9] },
            { title: results.data[0][10] },
            { title: results.data[0][11] },
            { title: results.data[0][12] },
            { title: results.data[0][13] },
            { title: results.data[0][14] }
            /* { title: "high - open"},
            { title: "Low - open"},
            { title: "Change %"}, */
        ],
		
		"columnDefs": [ 
			{
				"targets": [ 14 ],
				"visible": false
			},

			{
			"type": "html-num-fmt", "targets": [3,5,6,7,8,9,11,13]
			}

			
			]
		
		
	} );
	
	
	//INSTRUMENT,SYMBOL,EXPIRY_DT,STRIKE_PR,OPTION_TYP,OPEN,HIGH,LOW,CLOSE,SETTLE_PR,CONTRACTS,VAL_INLAKH,OPEN_INT,CHG_IN_OI,TIMESTAMP,
	
	
	yadcf.init(table, [
		/*{column_number : 1},
		 {column_number : 5, filter_type: "range_number"}, */
		
		{
            column_number : 0, //INSTRUMENT
            filter_container_id: 'foexternal_filter_container_0'
        }
		
		 ,
		{
            column_number : 1, //SYMBOL
            filter_container_id: 'foexternal_filter_container_1'
        },
		
		{
            column_number : 2, //EXPIRY_DT
            filter_container_id: 'foexternal_filter_container_2'
        },
		
		{
            column_number : 3, //STRIKE_PR
            filter_container_id: 'foexternal_filter_container_3'
        },
		
		{
            column_number : 4, //OPTION_TYP
            filter_container_id: 'foexternal_filter_container_4'
        }  
	]);

	}
	
	});

	}
	
	

	
	/* $('#submit-parse').click(function() {
		var files = $('#files')[0].files;
		readBhavCSV(files[0]);
	}); */
	
	
	
	$('#loadbhav').click(function(e) {
		var str=$('#datepicker2').val();
		//cm24MAR2017bhav	
		var res = str.toUpperCase() ;
		var bhavurl="";
		
		var selOpt=$("input[name='section']:checked").val();
		if(selOpt=="equity"){
			bhavurl="data/bhavcopy/cm"+res+"bhav.csv";
			$('.eqfilter').show();
			readBhavCSV(bhavurl);
			
		}else if(selOpt=="fno"){
			bhavurl="data/bhavcopy/fo"+res+"bhav.csv";
			$('.fofilter').show();
			readFNOBhavCSV(bhavurl);
		}
	});


});