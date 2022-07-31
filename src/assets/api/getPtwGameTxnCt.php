<?php
include 'include.php';

$sql = "SELECT DISTINCT game_name FROM ptw_txn";

$gameList = sql_submit($sql);

print_r($gameList);
