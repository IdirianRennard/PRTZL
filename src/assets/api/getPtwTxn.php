<?php
include 'include.php';

function destring($str)
{
  return (int)$str;
}

class PtwTxn
{
  public $attendee_id;
  public $first_name;
  public $last_name;
  public $game_name;
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

$attendee_select = [
  'attendee_id',
  'first_name',
  'last_name',
];

$return_array = [];

foreach ($ptwTxnList as $entry) {

  $where = [
    'attendee_id' => (int)$entry->attendee_id,
  ];

  $attendee = select_sql($attendee_select, 'attendees', $where)[0];

  $scrTxn = new PtwTxn();
  $scrTxn->attendee_id = $entry->attendee_id;
  $scrTxn->first_name = $attendee->first_name;
  $scrTxn->last_name = $attendee->last_name;
  $scrTxn->game_name = $entry->game_name;

  $return_array[] = $scrTxn;
}

json_return($return_array);