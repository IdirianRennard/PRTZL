<?php
include 'include.php';

class credentials
{
  public $email;
  public $appkey;
}

$select = [
  "email",
  "appkey"
];

json_return(select_sql($select, 'sheet_login', null));