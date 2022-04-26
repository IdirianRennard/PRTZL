<?php
include 'include.php';

//Get the TTE Key
$tte = call("https://www.houserennard.online/credits/tte.json");
$tte = json_decode( $tte );

$TTE_URL = "https://tabletop.events/api";

class Login {
  public $api_key_id;
  public $password;
  public $username;
}

$loginUrl = "$TTE_URL/session";

$loginData = new Login ();
$loginData->username = $tte->username;
$loginData->password = "********************";
$loginData->api_key_id = $tte->key;

json_return( $loginData );

$loginData->password = urldecode( base64_decode( $tte->encoded_pw ) );

$login = post_call( $loginData, $loginUrl );

// function mapAttendee ( $arr ) {
//   $attendee = new stdClass();
//   $attendee->attendee_id = (int)$arr['attendee_id'];
//   $attendee->first_name = $arr['first_name'];
//   $attendee->last_name = $arr['last_name'];

//   if ( !is_null( $arr['con_id'] ) ) {
//     $badge = new stdClass();
//     $badge->id = (int)$arr['badge_id'];
//     $badge->timestamp = $arr['timestamp'];
//     $attendee->badge = $badge;
//   } else {
//     $attendee->badge = null;
//   }

//   return $attendee;
// }

// $sql = "SELECT attendees.attendee_id, attendees.first_name, attendees.last_name, reg_txn.attendee_id AS con_id, reg_txn.badge_id, reg_txn.timestamp
//         FROM attendees
//         LEFT JOIN reg_txn ON attendees.attendee_id = reg_txn.attendee_id
//         ORDER BY attendees.attendee_id ASC";

// json_return( array_map( 'mapAttendee', sql_submit( $sql ) ) );

json_return( $login );
?>
