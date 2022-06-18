<?php
include 'include.php';

$post = file_get_contents('php://input');

json_return( $post );

// $insert = [
//   'attendee_id' =>  $post['id'],
//   'barcode'     =>  $post['barcode'],
// ];

// json_return( insert_sql( $insert, 'reg_txn' ));

?>
