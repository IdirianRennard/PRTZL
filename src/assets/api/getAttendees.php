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

echo "Total Attendees: $totalItems \n\n";

$tteBadges = [];

$select = [
  'attendee_id',
  'first_name',
  'last_name',
];

$attendees = select_sql($select, 'attendees', null);
$idList = array_column($attendees, 'attendee_id');

echo "Preloaded Attendees:";
print_r($attendees);
echo "\n\n";

echo "Id List:";
print_r($idList);
echo "\n\n";


if ((int)$totalItems > (int)Count($attendees)) {

  for ($i = 1; $i < $totalPages + 1; $i++) {
    if ($i !== 1) {
      $pagedBadgesUrl = "$badgesUrl&_page_number=$i";
      $badges = get_call($pagedBadgesUrl);
    }

    $items = $badges->result->items;

    foreach ($items as $k => $v) {
      echo "Specific Entry:";
      print_r($v);
      echo "\n\n";

      echo "Search Array:";
      print_r(array_search($v->badge_number, $idList));
      echo "\n\n";

      if (!array_search($v->badge_number, $idList)) {
        $insert = [
          'attendee_id' => $v->badge_number,
          'first_name' => $v->firstname,
          'last_name' => $v->lastname,
          'barcode' => null,
        ];

        insert_sql($insert, 'attendees');
      }
    };
  }

  $attendees = select_sql($select, 'attendees', null);
};

echo "Attendees :";
print_r($attendees);
echo "\n\n";

$select = [
  'attendee_id',
  'barcode',
  'timestamp',
];

$regTxnList = select_sql($select, 'reg_txn', null);
$regIdList = array_column($regTxnList, 'attendee_id');

foreach ($attendees as $k => $v) {
  $attendee = new Attendee(
    $id = $v->attendee_id,
    $first_name = $v->firstname,
    $last_name = $v->last_name,
    $barcode = [],
  );

  $where = ['attendee_id' => $v->badge_number];

  if (array_search($v->attendee_id, $regIdList)) {

    $txn = array_map('mapTxn', select_sql($select, "reg_txn",  $where));
    usort($txn, fn ($a, $b) => $b->timestamp - $a->timestamp);

    array_push($attendee->barcode, $txn);
  }

  $tteBadges[(int)$v->badge_number] = $attendee;
}

json_return($tteBadges);
