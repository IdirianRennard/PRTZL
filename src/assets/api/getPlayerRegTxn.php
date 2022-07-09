<?php
include 'include.php';

$select = [
  'attendee_id',
  'barcode',
  'timestamp',
];

$where = [
  "barcode"  => "LIKE %" . $_GET['barcode'] . "%"
];

json_return(select_sql($select, 'reg_txn', $where));
