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

function getRegTxns($attendeeID, $regTxnList)
{
  return array_filter($regTxnList, fn ($txn) => $txn['attendee_id'] === $attendeeID);
}

$length = 8;

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
];

$attendeeIdList = select_sql($select, 'attendees', null);
print_r($attendeeIdList);
$time1 = new DateTime();
$diff = array_diff($attendeeIdList, $tteIdList);
$time2 = new DateTime();

echo "diff: \t " . count($diff) . "\n";
$interval = $time1->diff($time2);
echo "\ttime: \t" . $interval->f . "\n";
print_r($delta);
echo "\n\n";

$time1 = new DateTime();
$delta = arrayDelta($attendeeIdList, $tteIdList);
$time2 = new DateTime();

echo "delta: \t " . count($delta) . "\n";
$interval = $time1->diff($time2);
echo "\ttime: \t" . $interval->f . "\n";
print_r($delta);
echo "\n\n";

json_return(false);

// if ((int)$totalItems !== (int)count($attendeeIdList)) {

//   for ($i = 1; $i < $totalPages + 1; $i++) {
//     if ($i !== 1) {
//       $pagedBadgesUrl = "$badgesUrl&_page_number=$i";
//       $badges = get_call($pagedBadgesUrl);
//       $badges = json_decode($badges);
//     }

//     $items = $badges->result->items;
//     $itemId = array_column($items, 'badge_number');

//     foreach ($itemId as $k => $v) {
//       if (!array_search($v, $attendeeIdList)) {
//         $insert = [
//           'tte_id' => $items[$k]->id,
//           'attendee_id' => $items[$k]->badge_number,
//           'first_name' => magicEraser($items[$k]->firstname),
//           'last_name' => magicEraser($items[$k]->lastname),
//         ];

//         insert_sql($insert, 'attendees');
//       }
//     };
//   }
// };

// $select = [
//   'attendee_id',
//   'first_name',
//   'last_name'
// ];

// $where = [];

// $attendees = select_sql($select, 'attendees', null);
// $attendeeIdList = array_column($attendees, 'attendee_id');

// $select = [
//   'attendee_id',
//   'barcode',
//   'timestamp',
// ];

// $regTxnList = select_sql($select, 'reg_txn', null);

// foreach ($attendeeIdList as $k => $v) {

//   $updatedID = (string)substr((str_repeat(0, $length) . $v), -$length);
//   $updatedBarcode = array_values(getRegTxns($updatedID, $regTxnList));

//   $scratchAttendee = new Attendee();
//   $scratchAttendee->id = $updatedID;
//   $scratchAttendee->first_name = $attendees[$k]['first_name'];
//   $scratchAttendee->last_name = $attendees[$k]['last_name'];
//   $scratchAttendee->barcode = $updatedBarcode;

//   $tteBadges[(int)$v] = $scratchAttendee;
// }

// json_return($tteBadges);
