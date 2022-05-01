<?php
include 'include.php';

$fp = fopen( 'php://input', 'r');
$rawData = stream_get_contents($fp);

print_r( json_decode( $rawData ) );

?>
