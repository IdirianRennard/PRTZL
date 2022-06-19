<?php
include 'include.php';

json_return( select_sql( '*', 'lib_xo_txn', null ) );
?>
