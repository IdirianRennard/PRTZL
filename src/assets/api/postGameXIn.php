<?php
include 'include.php';

$post = json_decode(file_get_contents('php://input'));

$insert = [
  'game_barcode' => $post->gameBarcode,
  'timestamp' => null,
  'txn_key' => null,
];

json_return(insert_sql($insert, 'lib_xin_txn'));
