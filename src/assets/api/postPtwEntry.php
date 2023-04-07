<?php
include 'include.php';

$post = json_decode(file_get_contents('php://input'));

$loop = $post->loops;
$game = $post->gameName;

unset($post->loops);
unset($post->gameName);

json_return(true);

for ($i = 0; $i < $loop; $i++) {

  foreach ($post as $key => $val) {

    if (strlen($val) > 0) {
      $player = call("https://asher.houserennard.online/assets/api/getRegAttendees.php/?barcode=" . $val);
      $player = json_decode($player)[0];

      $insert = [
        'game_name' => $game,
        'attendee_id' => $player->id,
        'txn_id' => null,
        'timestamp' => null,
      ];

      $return = insert_sql($insert, 'ptw_txn');
    }
  }
}
