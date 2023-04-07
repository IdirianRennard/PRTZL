<?php
include './f(x)/google.php';
include './db/db_scr.php';

$time = gmdate('Y-M-d_H:i:s_T');

header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET, HEAD, OPTIONS, POST, PUT');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Origin: *');
