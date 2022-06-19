<?php
	include "../f(x)";

	$call = json_decode( call( "https://www.houserennard.online/credits/tte.json") );
	class db_creds {
    public $db;
    public $host;
    public $user;
    public $pwd;
  }

  $creds = new db_creds( $db = $call->db, $host = $call->host, $user = $call->user, $pwd = $call->pwd );

  json_return( $creds );
?>
