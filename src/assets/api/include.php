<?php
include './f(x)/script.php';
include './db/db_scr.php';

$time = gmdate( 'Y-M-d_H:i:s_T' );

header( 'Access-Control-Allow-Origin: *' );
header( 'Access-Control-Allow-Methods: GET, HEAD, OPTIONS, POST, PUT' );
header( 'Content-Type: application/json' );

?>
