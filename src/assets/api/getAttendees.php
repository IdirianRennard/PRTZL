<?php
include 'include.php';

$sql = "SELECT attendees.attendee_id, attendees.first_name, attendees.last_name, reg_txn.attendee_id AS con_id, reg_txn.badge_id, reg_txn.timestamp FROM attendees LEFT JOIN reg_txn ON attendees.attendee_id = reg_txn.attendee_id";

json_return( sql_submit( $sql ) )

?>
