<?php

	require_once dirname(__FILE__)."/PhpProxy.php";

	//print_r($_SERVER);

	$proxy=new PhpProxy();
	$proxy->setRemoteSite("http://staging.tunapanda.org/learninglocker/public/data/xAPI/");
	$proxy->dispatch();
