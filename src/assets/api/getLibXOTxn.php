<?php
include 'include.php';

$select = [
  'attendee_barcode',
  'game_barcode',
  'timestamp'
];

$where = [
  'game_barcode' => $_GET['barcode'],
];

json_return(select_sql($select, 'lib_xo_txn', $where));
