<?php
include 'include.php';

// strlen($_GET['barcode']) > 0 ? $barcode = $_GET['barcode'] : $barcode = '00000000';
$return_array = [];

if (strlen($_GET['barcode']) === 0) {
  json_return($return_array);
  exit;
} else {
  $barcode = $_GET['barcode'];
}

$select = [
  'attendee_id',
  'barcode',
  'timestamp',
];

$where = [
  'barcode' => $barcode,
];

$reg_txn = select_contains_sql($select, 'reg_txn', $where);
echo "reg_txn: \n";
print_r($reg_txn);
echo "\n\n";

if (is_null($reg_txn[0]['attendee_id'])) {
  json_return($return_array);
  exit;
}

$select = [
  'attendee_id',
  'first_name',
  'last_name',
];

$where = [
  'attendee_id' => (int)$reg_txn['attendee_id'],
];

$attendee = select_contains_sql($select, 'attendees', $where);
echo "attendee: \n";
print_r($attendee);
echo "\n\n";

$return = new stdClass();

$return->id = $reg_txn['attendee_id'];
$return->first_name = $attendee['first_name'];
$return->last_name = $attendee['last_name'];
$return->barcode = [
  $reg_txn
];

$return_array[] = $return;

json_return($return_array);
