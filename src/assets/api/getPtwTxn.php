<?php
include 'include.php';

function getHash($obj)
{
  $obj->hash = hash('sha256', json_encode($obj));

  print_r($obj);
  return $obj;
}

if (count($_GET) === 0) {
  $where = null;
} else {
  $where = $_GET;
}

$select = [
  'game_name',
  'attendee_id',
  'timestamp'
];

$ptwTxnList = select_sql($select, 'ptw_txn', $where);

$returnList = array_map('getHash', $ptwTxnList);

json_return($returnList);
