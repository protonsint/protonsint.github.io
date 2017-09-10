<?php

// Doesn't do any sort of checking on the file validity just yet.
$upload_dir = "uploaded/";
$filename		= $upload_dir . basename($_FILES["fto"]["name"]);
$uploadValid = 1;

if ($_FILES["fto"]["size"] > 20480000) {
	echo "Your file is too large. Please upload a file that is smaller than 20MB.";
	$uploadValid = 0;

}

if ($uploadValid == 0){
	echo "Error: Your file cannot be uploaded as-is. Please make sure it's the correct size before attempting again.";
} else {
	if (move_uploaded_file($_FILES["fto"]["tmp_name"], $filename)) {
		echo "The file " . basename( $_FILES["fto"]["name"]). " has been uploaded.<a href='/indistocks/'>Home</a>";
	} else {
		echo "An unknown error has occurred. Please try again.";
	}
}



?>
