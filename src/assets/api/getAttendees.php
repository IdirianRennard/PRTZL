<?php
include 'include.php';

function mapAttendee ( $obj ) {
  $attendee = new stdClass();
  $attendee->attendee_id = (int)$obj->badge_number;
  $attendee->first_name = $obj->firstname;
  $attendee->last_name = $obj->lastname;
  $attendee->email = $obj->email;
  $attendee->badge = null;

  return $attendee;
}

class Attendee {
  public $attendee_id;
  public $first_name;
  public $last_name;
  public $email;
  public $badge;
}

//Get the TTE Key
$tte = get_call("https://www.houserennard.online/credits/tte.json");
$tte = json_decode( $tte );
$conId = $tte->con_key;

$TTE_URL = "https://tabletop.events/api";

$badgesUrl = "$TTE_URL/convention/$conId/badges?_items_per_page=100";
$badges = get_call( $badgesUrl );
$badges = json_decode( $badges );
$pages = $badges->result->paging;

$tteBadges = [];

array_push( $tteBadges, ...$badges->result->items );

for( $i = 1; $i <= $pages->total_pages ; $i++ ){
  if( $i === 1 ) {

  } else {
    $badgesUrl += "&page=$i";
    $badges = get_call( $badgesUrl );
    $badges = json_decode( $badges );

    array_push( $tteBadges, ...$badges->result->items );
  }
}

print_r( $tteBadges );
// $attendee = [];

// for( $i = 0 ; $i < count( $tteBadges ) ; $i++ ){

//   $scr = new Attendee (
//     $tteBadges[$i]->badge_number,
//     $tteBadges[$i]->firstname,
//     $tteBadges[$i]->lastname,
//     $$tteBadges[$i]->email,
//     null
//   );


//   array_push( $attendee, $scr );
// }

// json_return( $attendee );

// $sql = "SELECT attendees.attendee_id, attendees.first_name, attendees.last_name, reg_txn.attendee_id AS con_id, reg_txn.badge_id, reg_txn.timestamp
//         FROM attendees
//         LEFT JOIN reg_txn ON attendees.attendee_id = reg_txn.attendee_id
//         ORDER BY attendees.attendee_id ASC";

// json_return( array_map( 'mapAttendee', $tteBadges ));
?>
