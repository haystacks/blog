<?php
	// header('Access-Control-Max-Age: ')
	header('Access-Control-Allow-Origin: http://localhost:4000');
	// header('Content-Type: application/json');
	// header('Access-Control-Allow-Headers: Content-Type');
	$obj = '{abc:123}';
	$str = 'abc('. $obj .')';
	print_r($str);
?>