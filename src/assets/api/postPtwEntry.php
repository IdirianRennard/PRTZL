<?php
include 'include.php';

$post = json_decode(file_get_contents('php://input'));

$loop = $post->loops;
$game = $post->gameName;

unset($post->loops);
unset($post->gameName);

for ($i = 0; $i < $loop; $i++) {

  foreach ($post as $key => $val) {

    $player = call("https://prtzl.houserennard.online/assets/api/getRegAttendees.php/?barcode=" . $val);

    print_r($player);
  }
}
