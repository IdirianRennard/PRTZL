<?php
include 'include.php';

function mapAttendee ( $obj ) {
    $attendee = new stdClass();
    $attendee->attendee_id = $obj.attendee_id;
    $attendee->first_name = $obj.first_name;
    $attendee->last_name = $obj.last_name;

    if ( !is_null( $obj.con_id ) ) {
        $attendee->badge->id = $obj.badge_id;
        $attendee->badge->timestamp = $obj.timestamp;
    } else {
        $attendee->badge = null;
    }

    return $attendee

}

$sql = "SELECT attendees.attendee_id, attendees.first_name, attendees.last_name, reg_txn.attendee_id AS con_id, reg_txn.badge_id, reg_txn.timestamp FROM attendees LEFT JOIN reg_txn ON attendees.attendee_id = reg_txn.attendee_id" ORDER BY attendees.attendee_id ASC”;

json_return( array_map( ‘mapAttendee’, sql_submit( $sql ) );

?>
