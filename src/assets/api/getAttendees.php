<?php
include 'include.php';

class Attendee {
  public $id;
  public $first_name;
  public $last_name;
  public $barcode;
}

class Txn {
  public $id;
  public $timestamp;
}

function mapTxn ( $arr ) {
  $txn = new Txn ();
  $txn->id = $arr[ 'barcode' ];
  $txn->timestamp = $arr[ 'timestamp' ];

  return $txn;
}

//Get the TTE Key
$tte = get_call("https://www.houserennard.online/credits/tte.json");
$tte = json_decode( $tte );
$conId = $tte->con_key;

$TTE_URL = "https://tabletop.events/api";

$badgesUrl = "$TTE_URL/convention/$conId/badges?_order_by=badge_number";
$badges = get_call( $badgesUrl );
$badges = json_decode( $badges );
$pages = $badges->result->paging;

$items = $badges->result->items;
$tteBadges = [];

foreach( $items as $k => $v ) {

  $where = [];
  $where["attendee_id"] = $v->badge_number;

  $select = [
    'attendee_id',
    'barcode',
    'timestamp',
  ];

  $txn = array_map( 'mapTxn', select_sql( $select, "reg_txn",  $where ) );
  usort( $txn, fn( $a, $b) => $b->timestamp - $a->timestamp );

  $attendee = new Attendee();

  $attendee->id         = (int)$v->badge_number;
  $attendee->first_name = $v->firstname;
  $attendee->last_name  = $v->lastname;
  $attendee->barcode    = $txn;

  $tteBadges[ $attendee->id ] = $attendee;
}

for( $i = 1; $i <= $pages->total_pages ; $i++ ){
  $pagedBadgesUrl = "$badgesUrl&page=$i";
  $pagedBadges = get_call( $pagedBadgesUrl );
  $pagedBadges = json_decode( $pagedBadges );

  $items = $pagedBadges->result->items;

  foreach( $items as $k => $v ) {

    $where = [];
    $where["attendee_id"] = $v->badge_number;

    $select = [
      'attendee_id',
      'barcode',
      'timestamp',
    ];

    $txn = array_map( 'mapTxn', select_sql( $select, "reg_txn",  $where ) );
    usort( $txn, fn( $a, $b) => $b->timestamp - $a->timestamp );

    $attendee = new Attendee();

    $attendee->id         = (int)$v->badge_number;
    $attendee->first_name = $v->firstname;
    $attendee->last_name  = $v->lastname;
    $attendee->barcode    = $txn;

    $tteBadges[ $attendee->id ] = $attendee;
  }
}

json_return( $tteBadges );
?>
