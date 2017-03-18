<?php

    /**
     * Mozilla/5.0 (Linux; Android 5.1; m2 note Build/LMY47D; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/53.0.2785.49 Mobile MQQBrowser/6.2 TBS/043024 Safari/537.36 MicroMessenger/6.5.4.1000 NetType/WIFI Language/zh_CN

     * Dalvik/2.1.0 (Linux; U; Android 5.1; m2 note Build/LMY47D) Built-in music  MicroMessenger/6.5.4.1000
     */ 
    if(strpos($_SERVER['HTTP_USER_AGENT'], 'Dalvik') === 0) {
        header('location: http://zhangmenshiting.baidu.com/data2/music/8908392c65597c5a86f76b65ca51abd9/537817997/537817997.mp3?xcode=5de7cb32471b34997ddf74b1a6ef6955');
    } else {
        header('location: https://www.unofficial.cn/');
    }
?>
