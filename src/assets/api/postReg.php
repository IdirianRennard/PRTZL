<?php
include 'include.php';

$post = json_decode( file_get_contents('php://input') );

echo $post;

$insert = [
  'attendee_id' =>  $post->id,
  'barcode'     =>  $post->barcode,
];

json_return( insert_sql( $insert, 'reg_txn' ));
