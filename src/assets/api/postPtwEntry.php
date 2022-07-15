<?php
include 'include.php';

$post = json_decode(file_get_contents('php://input'));

$loop = $post->loop;
$game = $post->gameName;

unset($post->loop);
unset($post->gameName);

print_r($post);
