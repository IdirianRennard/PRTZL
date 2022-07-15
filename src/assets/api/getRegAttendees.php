<?php
include 'include.php';

strlen($_GET['barcode']) > 0 ? $barcode = $_GET['barcode'] : $barcode = '00000000';

$select = [
  'attendee_id',
  'barcode'
];

$where = [
  'barcode' => $barcode,
];

$reg_txn = select_sql($select, 'reg_txn', $where);

print_r($reg_txn);
