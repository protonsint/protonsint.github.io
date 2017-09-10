<?php

/** 
Current date: http://example.com/path/to/file/get-nse-bhavcopy.php

Specific date: http://example.com/path/to/file/get-nse-bhavcopy.php?date=06-Sep-2016*/





function date_tz($format, $timestamp = false, $tz = 'Europe/London'){
	if(!$timestamp) $timestamp = time();
	$dt = new DateTime("now", new DateTimeZone($tz)); 
	$dt->setTimestamp($timestamp);
	if($format == 'DateTime') return $dt;
	return $dt->format($format);	
}

function delete_files($bhavcopy_file, $bhavcopy_csvfile){
	/*printf(_pstr("Deleting downloaded files... %s and %s"), $bhavcopy_file, $bhavcopy_csvfile);

	unlink($bhavcopy_csvfile);*/

	printf(_pstr("Deleting downloaded files... %s and %s"), $bhavcopy_file);
	unlink($bhavcopy_file);

}

function _pstr($t, $m = '') {
	if(PHP_SAPI !== 'cli'){
		$color = ($m == 'error' ? 'color: red' : '');
		return '<p style="font-family: monospace;'.$color.'">'.$t.'</p>'.PHP_EOL;
	} else {
		$color = ($m == 'error' ? chr(27).'[0;31m' : '');
		return $color.$t.' '.chr(27).'[0m'.PHP_EOL;
	}
}

if(PHP_SAPI === 'cli'){
	$_REQUEST = getopt('', array('date::'));
}

if(!isset($_REQUEST['date'])) {
	$date = date_tz('DateTime', time(), 'Asia/Kolkata');
} else {
	$date = date_tz('DateTime', strtotime($_REQUEST['date']), 'Asia/Kolkata');
}

$bhavcopy_file = sprintf('cm%s%s%dbhav.csv.zip', 
	$date->format('d'), 
	strtoupper($date->format('M')), 
	$date->format('Y')
);
$bhavcopy_url = sprintf('https://www.nseindia.com/content/historical/EQUITIES/%d/%s/%s', 
	$date->format('Y'), 
	strtoupper($date->format('M')), 
	$bhavcopy_file
);
echo "<a href='/nse_bhavcopy.html'>nse_bhavcopy.html</a>";
printf(_pstr("Downloading bhavcopy file from %s..."), $bhavcopy_url);

$ch = curl_init($bhavcopy_url);
curl_setopt($ch, CURLOPT_HEADER, false);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0'); 
$output = curl_exec($ch);
$httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

if($httpcode != 200){
	printf(_pstr("Bhavcopy not found at %s. HTTP error: %s", 'error'), $bhavcopy_url, $httpcode);
	exit();	
}

$fh = fopen($bhavcopy_file, 'w');
fwrite($fh, $output);
fclose($fh);

printf(_pstr("Saving bhavcopy file %s"), $bhavcopy_file);

$zip = new ZipArchive;
$res = $zip->open($bhavcopy_file);

if ($res === TRUE) {

	printf(_pstr("Extracting bhavcopy file %s"), $bhavcopy_file);
	$zip->extractTo(getcwd().'/data/bhavcopy/');
	$zip->close();
	$bhavcopy_csvfile = str_replace('.zip','',$bhavcopy_file);
	printf(getcwd().'/data/bhavcopy/');
	
	delete_files($bhavcopy_file, $bhavcopy_csvfile);


} else {
	printf(_pstr("Extracting failed. Error code: %s", 'error'), $res);
	exit();
}