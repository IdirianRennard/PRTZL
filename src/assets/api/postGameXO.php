<?php
include 'include.php';

$post = json_decode(file_get_contents('php://input'));

$insert = [
  'attendee_barcode' => $post->playerBarcode,
  'game_barcode' => $post->gameBarcode,
  'timestamp' => null,
  'txn_key' => null,
];

json_return(insert_sql($insert, 'lib_xo_txn'));
