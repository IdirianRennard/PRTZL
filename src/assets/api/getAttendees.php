<?php
include 'include.php';

function mapAttendee ( $arr ) {
  $attendee = new stdClass();
  $attendee->attendee_id = (int)$arr->badge_number;
  $attendee->first_name = $arr->firstname;
  $attendee->last_name = $arr->lastname;
  $attendee->email = $arr->email;

  // if ( !is_null( $arr['con_id'] ) ) {
  //   $badge = new stdClass();
  //   $badge->id = (int)$arr['badge_id'];
  //   $badge->timestamp = $arr['timestamp'];
  //   $attendee->badge = $badge;
  // } else {
  //   $attendee->badge = null;
  // }

  return $attendee;
}

//Get the TTE Key
$tte = get_call("https://www.houserennard.online/credits/tte.json");
$tte = json_decode( $tte );
$conId = $tte->con_key;

$TTE_URL = "https://tabletop.events/api";

$badgesUrl = "$TTE_URL/convention/$conId/badges?_items_per_page=100";
$badges = get_call( $badgesUrl );
$badges = json_decode( $basges );
$pages = $badges->result->paging;

$attendees = [];
$attendees[] = $badge->result->items;

for( $i = 1; $i <= $pages->total_pages ; $i++ ){
  if( $i === 1 ) {

  } else {
    $badgesUrl += "&page=$i";
    $badges = get_call( $badgesUrl );
    $badges = json_decode( $badges );
    $attendees[] = $badge->result->items;
  }
}

// $session = new Session ();
// $session->sessionId = $login->id;
// $session->userId = $login->user_id;

// $fetchBadge = [ "_includes" => "PretzCon" ];
// $fetchQuerry = http_build_query( $fetchBadge );
// $badgeUrl = "$TTE_URL/badge/?$fetchQuery";
// $badges = get_call( $fetchBadge, $badgeUrl );

// echo $badgeUrl;



// $sql = "SELECT attendees.attendee_id, attendees.first_name, attendees.last_name, reg_txn.attendee_id AS con_id, reg_txn.badge_id, reg_txn.timestamp
//         FROM attendees
//         LEFT JOIN reg_txn ON attendees.attendee_id = reg_txn.attendee_id
//         ORDER BY attendees.attendee_id ASC";

json_return( array_map( 'mapAttendee', $attendees ));
?>
