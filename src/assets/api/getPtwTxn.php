<?php
include 'include.php';

// function destring($str)
// {
//   return (int)$str;
// }

$sql = "SELECT Ptw.game_name, Attendee.attendee_id, Attendee.first_name, Attendee.last_name, Ptw.timestampFROM ptw_txn INNER JOIN attendees ON CAST(Ptw.attendee_id AS INT) = Attendee.attendee_id";

json_return(sql_submit($sql));

// class PtwTxn
// {
//   public $attendee_id;
//   public $first_name;
//   public $last_name;
//   public $game_name;
// }

// if (count($_GET) === 0) {
//   $where = null;
// } else {
//   $where = $_GET;
// }

// $select = [
//   'game_name',
//   'attendee_id',
//   'timestamp'
// ];

// $ptwTxnList = select_sql($select, 'ptw_txn', $where);

// $attendee_select = [
//   'attendee_id',
//   'first_name',
//   'last_name',
// ];

// $return_array = [];

// foreach ($ptwTxnList as $entry) {

//   print_r($entry);

//   $where = [
//     'attendee_id' => (int)$entry->attendee_id,
//   ];

//   $attendee = select_sql($attendee_select, 'attendees', $where)[0];

//   $scrTxn = new PtwTxn();
//   $scrTxn->attendee_id = $entry->attendee_id;
//   $scrTxn->first_name = $attendee->first_name;
//   $scrTxn->last_name = $attendee->last_name;
//   $scrTxn->game_name = $entry->game_name;

//   $return_array[] = $scrTxn;
// }

// // json_return($return_array);