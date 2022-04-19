<?php
include 'include.php';

// $sql = "SELECT * FROM `attendees` LEFT JOIN `reg_txn` ON attendees.attendee_id = reg_txn.attendee_id";
$select = '*';

echo select_sql( $select, 'attendees', null );

?>
