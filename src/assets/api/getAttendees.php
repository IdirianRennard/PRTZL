<?php
include 'include.php';

$sql = "SELECT `attendees`.*, `reg_txn`.* FROM `attendees` LEFT JOIN `reg_txn` ON attendees.attendee_id = reg_txn.attendee_id";

json_return( sql_submit( $sql ) )

?>
