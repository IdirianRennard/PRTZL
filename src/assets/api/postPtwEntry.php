<?php
include 'include.php';

$post = json_decode(file_get_contents('php://input'));

$loop = $post->loops;
$game = $post->gameName;

unset($post->loops);
unset($post->gameName);

for ($i = 0; $i < $loop; $i++) {

  foreach ($post as $key => $val) {
    echo "Key : \t $key, \t\t Val : \t $val";
  }
}

print_r($post);
