<?php
include './f(x)/script.php';
include './db/db_scr.php';

$time = gmdate( 'Y-M-d_H:i:s_T' );

header( 'Content-Type: application/json'        );
header( 'Access-Control-Allow-Methods: GET, POST'    );
header( 'Access-Control-Allow-Origin: *'        );
?>
