<?php
include 'include.php';

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

json_return($ptwTxnList);