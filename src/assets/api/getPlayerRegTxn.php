<?php
include 'include.php';

$where = [
  "barcode"  => $_GET['barcode']
];

json_return( select_sql( '*', 'reg_txn', $where) );
