<?php
include 'include.php';

$post = $_POST;

json_return( $post );

// $insert = [
//   'attendee_id' =>  $post['id'],
//   'barcode'     =>  $post['barcode'],
// ];

// json_return( insert_sql( $insert, 'reg_txn' ));

?>
