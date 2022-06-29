<?php
class get_db_creds
{
  public $db;
  public $host;
  public $user;
  public $pwd;
}

//get credentials
function db_credentials()
{
  $list = call('https://www.houserennard.online/credits/tte.json');
  $list = json_decode($list);

  $get_db_creds = new get_db_creds();
  $get_db_creds->db = $list->db;
  $get_db_creds->user = $list->user;
  $get_db_creds->host = $list->host;
  $get_db_creds->pwd = $list->pwd;

  // **IMPORTANT!!** this line calls a function in a different scripts file
  //please ensure the other file is also included in your page
  return make_json($get_db_creds);
}

//log into database
function db_login()
{

  //get the credentials
  $creds = db_credentials();

  //translate credentials to be used
  $creds = json_decode($creds);

  //modified from host for php connection to database
  $conn = new mysqli($creds->host, $creds->user, $creds->pwd, $creds->db);

  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }

  return $conn;
}

//make sql insert string
function insert_sql($array, $table)
{

  //start the insert string
  $return = "INSERT INTO $table (";

  //start the values string
  $values = "VALUES (";

  //loop through array to add to strings
  foreach ($array as $k => $v) {
    $return .= "$k, ";
    $values .= "'$v'" . ', ';
  }

  //trim the comma
  $return = rtrim($return, ", ");
  $values = rtrim($values, ", ");

  $return .= ")";
  $values .= ")";

  //concatenate
  $insert = "$return $values";

  $return = sql_submit($insert);

  return $return;
}

function select_sql($select_array, $table, $where)
{

  //start the select string
  $select = "SELECT ";

  //is array a wildcard?
  if (is_string($select_array)) {

    $select .= "$select_array ";
  } else {

    //loop through array to add to string
    foreach ($select_array as $item) {
      $select .= "$item, ";
    }
  }

  //trim the comma
  $select = rtrim($select, ", ");

  $select .= " FROM $table";

  //if where is not null then specify
  if ($where === NULL) {
  } else {

    $select .= " WHERE ";
    foreach ($where as $k => $v) {
      $select .= "$k = '$v' AND ";
    }

    $select = rtrim($select, " AND ");
  }

  $return = sql_submit($select);

  return $return;
}


//send to sql
function sql_submit($query)
{

  //log into dn
  $conn = db_login();

  //create the array for return;
  $return = [];

  //run the query
  if ($res = $conn->query($query)) {

    if (is_bool($res)) {

      return $res;
    } else {

      //fetch associated array
      while ($row = $res->fetch_assoc()) {
        $return[] = $row;
      }
    }
  }

  return $return;
}

//update sql
function update_sql($array, $table, $where)
{

  //start the update string
  $update = "UPDATE $table SET ";

  //what collumns are being changed
  foreach ($array as $k => $v) {
    $update .= "$k = '$v', ";
  }

  $update = rtrim($update, ", ");

  $update .= " WHERE ";

  //where is the note for those collumns
  foreach ($where as $k => $v) {
    $update .= "$k = '$v' AND ";
  }

  $update = rtrim($update, ' AND ');

  $return = sql_submit($update);

  return $return;
}
