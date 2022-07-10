<?php
include 'include.php';

$select = [
  'attendee_id',
  'barcode',
  'timestamp',
];

$where = [
  "barcode"  => $_GET['barcode'],
];

json_return(select_contains_sql($select, 'reg_txn', $where));
