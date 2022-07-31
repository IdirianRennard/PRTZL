<?php
include 'include.php';

$sql = "SELECT DISTINCT game_name FROM ptw_txn";

$gameList = sql_submit($sql);
$gameList = array_column($gameList, 'game_name');

$return = [];
foreach ($gameList as $game) {
  $sql = "SELECT COUNT(*) as $game  FROM ptw_txn WHERE game_name = '$game'";

  $gameCt = sql_submit($sql);

  print_r($gameCt);
}
