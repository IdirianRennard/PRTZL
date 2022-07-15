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

$reg_txn = select_sql($select, 'reg_txn', $where)[0];

print_r($reg_txn);

$select = [
  'attendee_id',
  'first_name',
  'last_name',
];

$where = [
  'attendee_id' => (int)$reg_txn['attendee_id'],
];


$attendee = select_sql($select, 'attendees', $where);

print_r($attendee);
