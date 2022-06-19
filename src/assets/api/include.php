<?php
include './f(x)/script.php';
include './db/db_scr.php';

$time = gmdate( 'Y-M-d_H:i:s_T' );

header( 'Content-Type: application/json'        );
header( 'Access-Control-Allow-Methods: GET, HEAD, OPTIONS, POST, PUT'    );
header( 'Access-Control-Allow-Origin: *'        );
header( 'Access-Control-Allow-Headers',
        'Access-Control-Allow-Headers,
          Origin,Accept,
          X-Requested-With,
          Content-Type,
          Access-Control-Request-Method,
          Access-Control-Request-Headers'
      );
?>
