<?php
include 'include.php';

class Tab
{
  public $name;
  public $loc;
  public $icon;
}

class Icon
{
  public $prefix;
  public $name;
}

$tabs = [];

$scr = new Tab();
$scr->name = "Ptw Drawing";
$scr->loc = "ptw_drawing";
$scr->icon = new Icon();
$scr->icon->prefix = "fas";
$scr->icon->name = "ticket";

$tabs[] = $scr;

$scr = new Tab();
$scr->name = "Settings";
$scr->loc = "settings";
$scr->icon = new Icon();
$scr->icon->prefix = "fas";
$scr->icon->name = "gear";

$tabs[] = $scr;

json_return($tabs);