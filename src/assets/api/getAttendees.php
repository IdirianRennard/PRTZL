<?php
include 'include.php';

class Attendee
{
  public $id;
  public $first_name;
  public $last_name;
  public $barcode = [];
}

class Txn
{
  public $id;
  public $timestamp;
}

function getRegTxns($attendeeID, $regTxnList)
{
  return array_filter($regTxnList, fn ($txn) => $txn['attendee_id'] === $attendeeID);
}

function mapReturn($obj)
{
  $length = 8;
  $updatedId = (string)substr((str_repeat(0, $length) . $obj['attendee_id']), -$length);

  $r = new Attendee();

  $r->id = $updatedId;
  $r->first_name = $obj['first_name'];
  $r->last_name = $obj['last_name'];

  return $r;
}

//Get the TTE Key
$tte = get_call("https://www.houserennard.online/credits/tte.json");

$tte = json_decode($tte);
$conId = $tte->con_key;

$TTE_URL = "https://tabletop.events/api";

$query = [
  '_items_per_page' => 100,
  '_order_by' => 'badge_number',
];

$query = http_build_query($query);

$badgesUrl = "$TTE_URL/convention/$conId/badges?$query";

$badges = get_call($badgesUrl);
$badges = json_decode($badges);

$pages = $badges->result->paging;
$totalPages = $pages->total_pages;
$totalItems = $pages->total_items;

$tteBadges = [];

$tteList = $badges->result->items;

for ($i = 2; $i <= $totalPages; $i++) {
  $pagedBadgesUrl = "$badgesUrl&_page_number=$i";
  $badges = get_call($pagedBadgesUrl);
  $badges = json_decode($badges);

  $tteList = array_merge($tteList, $badges->result->items);
}

$tteIdList = array_column($tteList, "badge_number");

$select = [
  'attendee_id',
  'first_name',
  'last_name'
];

$attendeeList = select_sql($select, 'attendees', null);
$attendeeIdList = array_column($attendeeList, "attendee_id");
$delta = array_diff($tteIdList, $attendeeIdList);

if (count($delta) > 0) {

  foreach ($delta as $k => $v) {
    $player = $tteList[$k];

    $insert = [
      'tte_id' => $player->id,
      'attendee_id' => $player->badge_number,
      'first_name' => magicEraser($player->firstname),
      'last_name' => magicEraser($player->lastname),
    ];

    insert_sql($insert, 'attendees');
  }

  $attendeeList = select_sql($select, 'attendees', null);
}

$returnList = array_map('mapReturn', $attendeeList);
json_return($returnList);
exit;
