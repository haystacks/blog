<?php
    $url = 'index.php?i='.$_GET['i'].'&c=entry&do=no&m=unofficial_music&id='.$_GET['id'];
    if($_SERVER["SERVER_PORT"] != 80) {
        $reqUrl = '//'.$_SERVER['SERVER_NAME'].':'.$_SERVER["SERVER_PORT"].$_SERVER["REQUEST_URI"];
    } else {
        $reqUrl = '//'.$_SERVER['SERVER_NAME'].$_SERVER["REQUEST_URI"];
    }
    $reqUrlArr = explode('attachment', $reqUrl);
    $url = $reqUrlArr[0].'app/'.$url;
    header('Location: '.$url);
?>
