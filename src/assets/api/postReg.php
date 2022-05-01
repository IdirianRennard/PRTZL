<?php
include 'include.php';

$fp = fopen( 'php://input', 'r');
$post = stream_get_contents($fp);
$post = json_decode($post);

$insert = [
  'attendee_id' =>  $post[ 'id '],
  'barcode'     =>  $post[ 'barcode' ],
  'timestamp'   =>  $time
];

json_return( insert_sql( $insert, 'reg_txn' ));

?>
