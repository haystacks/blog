<?php

use League\Csv\Reader;

require './vendor/autoload.php';
$reader = Reader::createFromPath('pro.csv');
foreach ($reader as $index => $row) {
    // var_dump(preg_split('/\t/', preg_split('/"<|>"/', $row[0])[2])[12]);
    var_dump(preg_split('/"<|>"/', $row[0]));
    if($index === 1) {
        exit;
    }
}