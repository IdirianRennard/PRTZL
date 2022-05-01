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

$attendees = array_map( 'mapAttendee', $tteBadges );
usort( $attendees, fn( $a, $b) => strcmp( $a->attendee_id, $b->attendee_id ) );

json_return( $attendees );

?>
