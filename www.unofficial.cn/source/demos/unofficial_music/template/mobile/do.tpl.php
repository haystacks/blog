<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>点歌送祝福</title>
    <style>
        html, body {
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
        }
        div {
            width: 98%;
            font-size: 18px;
            text-indent: 36px;
            position: absolute;
            top: 50%;
            left: 0;
            right: 0;
            margin: 0 auto;
            transform: translateY(-50%);
        }
    </style>
</head>
<body>
    <div>
        <?php
            echo $rs['blessing'];
        ?>
    </div>
</body>
</html>
