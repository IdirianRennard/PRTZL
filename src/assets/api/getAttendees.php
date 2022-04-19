<?php
include 'include.php';

$sql = "SELECT * FROM `attendees` LEFT JOIN `reg_txn` ON attendees.attendee_id = reg_txn.attendee_id";

echo sql_submit( $sql );

// $return = array_map( null, sql_submit( $sql ) );
?>
