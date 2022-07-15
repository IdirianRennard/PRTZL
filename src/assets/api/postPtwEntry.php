<?php
include 'include.php';

$post = json_decode(file_get_contents('php://input'));

$loop = $post->loops;
$game = $post->gameName;

unset($post->loops);
unset($post->gameName);

for ($i = 0; $i < $loop; $i++) {

  foreach ($post as $key => $val) {

    $select = [
      'attendee_id',
      'barcode',
    ];

    $where = [
      'barcode' => $val,
    ];

    $attendee = select_sql($select, 'reg_txn', $where);
  }
}

print_r($post);
