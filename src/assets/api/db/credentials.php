<?php
	include "../f(x)";

	class db_creds {
    public $db;
    public $host;
    public $user;
    public $pwd;
  }

  $url = "https://www.houserennard.online/credits/tte.json";

  echo "\nCALLING $url\n";
	$call = call( $url );

  $call = json_decode( $call );
  print_r($call);

  $creds = new db_creds( $db = $call->db, $host = $call->host, $user = $call->user, $pwd = $call->pwd );

  json_return( $creds );
?>
