<?php
include 'include.php';

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

$reg_txn = select_sql($select, 'reg_txn', $where);

if (count($reg_txn) > 1) {
  json_return($return_array);
  exit;
}

$reg = $reg_txn[0];

if (is_null($reg['attendee_id'])) {
  json_return($return_array);
  exit;
}

if (!is_nan((int)$reg['attendee_id'])) {
  $pk = (int)$reg['attendee_id'];
} else {
  json_return($return_array);
  exit;
}

$select = [
  'attendee_id',
  'first_name',
  'last_name',
];

$where = [
  'attendee_id' => $pk,
];

$attendee = select_sql($select, 'attendees', $where)[0];

$return = new stdClass();

$return->id = $reg['attendee_id'];
$return->first_name = $attendee['first_name'];
$return->last_name = $attendee['last_name'];
$return->barcode = [
  $reg_txn
];

$return_array[] = $return;

json_return($return_array);