<?php
include 'include.php';

$post = json_decode(file_get_contents('php://input'));

$loop = $post->loops;
$game = $post->gameName;

unset($post->loops);
unset($post->gameName);

for ($i = 0; $i < $loop; $i++) {

  foreach ($post as $key => $val) {

    if (strlen($val) > 0) {
      $player = call("https://prtzl.houserennard.online/assets/api/getRegAttendees.php/?barcode=" . $val);
      $player = json_decode($player);

      $insert = [
        'game_name' => $game,
        'attendee_id' => $player->id,
        'txn_id' => null,
        'timestamp' => null,
      ];

      insert_sql($insert, 'ptw_txn');
    }
  }
}

echo true;
