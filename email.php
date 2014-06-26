<?php

  $to = $_REQUEST['to'];
  $from = $_REQUEST['from'];
  $message = $_REQUEST['content'];
  $subject = $_REQUEST['subject'];
  // To send HTML mail, the Content-type header must be set
  $header  = 'MIME-Version: 1.0' . "\r\n";
  $header .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
  $header .= "From: <".$from.">" . "\r\n";
  //Checking for godforsaken PHP magic
  if (get_magic_quotes_gpc()) {
    $message = stripslashes($message);
  }
  $send = @mail($to, $subject, $message, $header);

  if (!$send) {
    die();
  };

  ?>