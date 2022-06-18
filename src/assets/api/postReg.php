<?php
include 'include.php';

$post = $_POST;

$insert = [
  'attendee_id' =>  $post['id'],
  'barcode'     =>  $post['barcode'],
];

json_return( insert_sql( $insert, 'reg_txn' ));

?>
