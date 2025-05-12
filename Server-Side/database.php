<?php

error_reporting(E_ALL);

/*

    Function for connecting to database
    Authors: Terence Lee Xin Jin
             Hoon Wei Xiong
*/

function connect_to_database()
{
    $host = "localhost";
    $dbuser = "admin";
    $dbpass = "[redacted]";
    $dbase = "apiary_management_system";

    // connect to the database
    $db_connection = mysqli_connect($host, $dbuser, $dbpass, $dbase);

    return $db_connection;
}



?>
