<?php
include 'include.php';

class Tab {
	public $name;
	public $loc;
	public $icon;
}

class Icon {
	public $prefix;
	public $name;
}

$tabs = [];

$scr = new Tab ();
$scr->name = "Player Registration";
$scr->loc = "player_reg";
$scr->icon = new Icon ();
$scr->icon->prefix = "fas";
$scr->icon->name = "address-card";

$tabs[] = $scr;


$scr = new Tab ();
$scr->name = "Game Check Out";
$scr->loc = "checkout";
$scr->icon = new Icon ();
$scr->icon->prefix = "fas";
$scr->icon->name = "play";

$tabs[] = $scr;

$scr = new Tab ();
$scr->name = "Game Check In";
$scr->loc = "checkin";
$scr->icon = new Icon ();
$scr->icon->prefix = "fas";
$scr->icon->name = "stop";

$tabs[] = $scr;

json_return( $tabs );

?>
