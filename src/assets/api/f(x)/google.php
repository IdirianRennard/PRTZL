<?php
include './f(x)/script.php';

function get_game_library($sheetId)
{
  $url = "https://sheets.googleapis.com/v4/spreadsheets/$sheetId";
  return get_call($url);
}
