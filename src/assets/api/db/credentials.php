<?php
	include "../f(x)";

	$call = call( "https://www.houserennard.online/credits/tte.json" );

  $call = json_decode( $call );
  print_r($call);
	class db_creds {
    public $db;
    public $host;
    public $user;
    public $pwd;
  }

  $creds = new db_creds( $db = $call->db, $host = $call->host, $user = $call->user, $pwd = $call->pwd );

  json_return( $creds );
?>
