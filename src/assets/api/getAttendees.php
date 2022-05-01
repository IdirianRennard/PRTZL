<?php
include 'include.php';

class Attendee {
  public $attendee_id;
  public $first_name;
  public $last_name;
  public $email;
  public $barcode;
}

function mapAttendee ( $obj ) {

  $where = [];
  $where["attendee_id"] = $obj->badge_number;

  $select = [
    'attendee_id',
    'barcode',
    'timestamp',
  ];

  $txn = select_sql( $select, "reg_txn",  $where );

  $attendee = new Attendee ();
  $attendee->attendee_id  = (int)$obj->badge_number;
  $attendee->first_name   = $obj->firstname;
  $attendee->last_name    = $obj->lastname;
  $attendee->email        = $obj->email;
  $attendee->barcode      = $txn;

  return $attendee;
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
usort( $attendees, fn( $a, $b) => $a->attendee_id - $b->attendee_id );

json_return( $attendees );

?>
