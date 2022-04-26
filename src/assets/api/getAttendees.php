<?php
include 'include.php';

//Get the TTE Key
$tte = get_call("https://www.houserennard.online/credits/tte.json");
$tte = json_decode( $tte );

$conId = $tte->con_key;

$TTE_URL = "https://tabletop.events/api";

class ConJson {
  public $convention_id;
  public $name;
  public $json;
}
class Login {
  public $api_key_id;
  public $password;
  public $username;
}

class Session {
  public $sessionId;
  public $userId;
}

$loginUrl = "$TTE_URL/session";

$loginData = new Login ();
$loginData->username = $tte->username;
$loginData->api_key_id = $tte->key;
$loginData->password = urldecode( base64_decode( $tte->encoded_pw ) );

$login = post_call( $loginData, $loginUrl );
$login = json_decode( $login );

$conJsonUrl = "$TTE_URL/conventionjson";
$conJsonData = new ConJson ();
$conJsonData->convention_id = $conId;
$conJsonData->name = "PretzCon 2022";
$conJsonData->json = [
  "convention_id" =>  $conId,
  "date_created"  =>  $time,
  "date_updated"  =>  $time,
  "id"            =>  "P",
  "json"          =>  null,
  "name"          =>  "PretzCon2022",
];

$conJson = con_call( $login->id, $conJsonData,  )

// $session = new Session ();
// $session->sessionId = $login->id;
// $session->userId = $login->user_id;

// $fetchBadge = [ "_includes" => "PretzCon" ];
// $fetchQuerry = http_build_query( $fetchBadge );
// $badgeUrl = "$TTE_URL/badge/?$fetchQuery";
// $badges = get_call( $fetchBadge, $badgeUrl );

// echo $badgeUrl;

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

json_return( $badges );
?>
