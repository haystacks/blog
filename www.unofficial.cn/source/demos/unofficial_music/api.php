<?php
    $id = $_GET['id'];
    $url = base64_decode($id);
    header('Location: '.$url);
?>
