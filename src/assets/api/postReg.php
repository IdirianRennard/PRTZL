<?php
include 'include.php';

$post = json_decode(file_get_contents('php://input'));


$insert = [
  'attendee_id' =>  $post->conID,
  'barcode'     =>  $post->formBarcode,
  'timestamp'   =>  null,
  'txn_key'     =>  null,
];

json_return(insert_sql($insert, 'reg_txn'));
