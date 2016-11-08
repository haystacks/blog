<?php
    print_r($_SERVER["CONTENT_TYPE"]);
    echo "<br >";
    print_r($_GET);
    echo "<br >";
    print_r($_REQUEST);
    echo "<br >";
    print_r($HTTP_RAW_POST_DATA);
    echo "<br >";
    print_r(file_get_contents("php://input"));
?>