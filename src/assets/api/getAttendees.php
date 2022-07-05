<?php
include 'include.php';

class Attendee
{
  public $id;
  public $first_name;
  public $last_name;
  public $barcode;
}

class Txn
{
  public $id;
  public $timestamp;
}

function mapTxn($arr)
{
  $txn = new Txn();
  $txn->id = $arr['barcode'];
  $txn->timestamp = $arr['timestamp'];

  return $txn;
}

//Get the TTE Key
$tte = get_call("https://www.houserennard.online/credits/tte.json");

$tte = json_decode($tte);
$conId = $tte->con_key;

$TTE_URL = "https://tabletop.events/api";

$badgesUrl = "$TTE_URL/convention/$conId/badges?_items_per_page=100&_order_by=badge_number";

$badges = get_call("$badgesUrl&page=0");
$badges = json_decode($badges);
$pages = $badges->result->paging;
$totalPages = $pages->total_pages;
$totalItems = $pages->total_items;

$tteBadges = [];

$select = [
  'attendee_id',
];

$attendeeIdList = select_sql($select, 'attendees', null);

if ((int)$totalItems > (int)count($attendeeIdList)) {

  for ($i = 1; $i < $totalPages + 1; $i++) {
    if ($i !== 1) {
      $pagedBadgesUrl = "$badgesUrl&_page_number=$i";
      $badges = get_call($pagedBadgesUrl);
      $badges = json_decode($badges);
    }

    $items = $badges->result->items;
    $itemId = array_column($items, 'badge_number');

    foreach ($itemId as $k => $v) {
      if (!array_search($v, $attendeeIdList)) {
        $insert = [
          'attendee_id' => $items[$k]->badge_number,
          'first_name' => $items[$k]->firstname,
          'last_name' => $items[$k]->lastname,
        ];

        insert_sql($insert, 'attendees');
      }
    };
  }
};

$select = [
  'attendee_id',
  'first_name',
  'last_name'
];

$attendees = select_sql($select, 'attendees', null);
$attendeeIdList = array_column($attendees, 'attendee_id');

$select = [
  'attendee_id',
  'barcode',
  'timestamp',
];

$regTxnList = select_sql($select, 'reg_txn', null);
$regIdList = array_column($regTxnList, 'attendee_id');


foreach ($attendeeIdList as $k => $v) {
  echo "Key: \t $k \t Val: \t $v \t Attendee Key: \t " . $attendees[$k]['attendee_id'] . "\n";

  print_r($attendee[$k]);

  $scratchAttendee = new Attendee(
    $id = $attendees[$k]['attendee_id'],
    $first_name = $attendees[$k]['first_name'],
    $last_name = $attendees[$k]['last_name'],
    $barcode = [],
  );

  print_r($scratchAttendee);

  echo "\n\n";

  // if (array_search($v->attendee_id, $regIdList)) {

  //   $txn = array_map('mapTxn', select_sql($select, "reg_txn",  $where));
  //   usort($txn, fn ($a, $b) => $b->timestamp - $a->timestamp);

  //   array_push($attendee->barcode, $txn);
  // }

  $tteBadges[(int)$v] = $scratchAttendee;
}

json_return($tteBadges);
