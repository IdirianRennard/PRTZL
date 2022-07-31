<?php
include 'include.php';

function getHash($obj)
{
  $r = new stdClass($obj);
  $r->game_name = $obj['game_name'];
  $r->attendee_id = $obj['attendee_id'];
  $r->timestamp = $obj['timestamp'];
  $r->hash = hash('sha256', json_encode($obj));

  return $r;
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
