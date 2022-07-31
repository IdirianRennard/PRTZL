<?php
include 'include.php';

function sortBtCt($a, $b)
{
  return ($a->count < $b->count) ? -1 : 1;
}

$sql = "SELECT DISTINCT game_name FROM ptw_txn";

$gameList = sql_submit($sql);
$gameList = array_column($gameList, 'game_name');

$return = [];
foreach ($gameList as $game) {
  $sql = "SELECT COUNT(*) as '$game'  FROM ptw_txn WHERE game_name = '$game'";

  $gameCt = sql_submit($sql)[0];

  $e = new StdClass();
  $e->game_name = $game;
  $e->count = $gameCt[$game];

  $return[] = $e;
}

usort($return, 'sortBtCt');
json_return($return);
