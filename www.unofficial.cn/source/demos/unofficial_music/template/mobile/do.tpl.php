<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>您有一条未读祝福</title>
  <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=0">
  <link rel="stylesheet" href="<?php echo MODULE_URL.'template/mobile/'?>css/style.css" media="screen" type="text/css" />
</head>
<body>
  <div class="container">
    <div id="folder" class="folder">
      <div id="paper" class="paper">
        <h1>您有一条未读祝福</h1>
        <div>
          <?php echo trim($rs['blessing']);?>
        </div>
      </div>
      <div id="cover" class="cover">
        <div class="title">Don't open</div>
      </div>
    </div>
    <div class="copyright">
      <?php if($settings['copyright']) {?>
      <?php echo str_replace('{微信公众号}', trim($_W['account']['name']), $settings['copyright']);?>
      <?php } else {?>
      『点歌送祝福』功能由 微信公众号 “<?php echo trim($_W['account']['name']);?>” 提供
      <?php } ?>
    </div>
  </div>
  <div class="container">
    <div id="qrcode" class="qrcode">
      <img src="<?php echo $settings['qrcode'];?>" />
    </div>
    <div class="copyright">
      <?php if($settings['copyright']) {?>
      <?php echo str_replace('{微信公众号}', trim($_W['account']['name']), $settings['copyright']);?>
      <?php } else {?>
      『点歌送祝福』功能由 微信公众号 “<?php echo trim($_W['account']['name']);?>” 提供
      <?php } ?>
    </div>
  </div>
  <script>
    ~function() {
      var folderEle = document.getElementById('folder'),
          coverEle = document.getElementById('cover'),
          paperEle = document.getElementById('paper'),
          h1Ele = paperEle.querySelector('h1');

      folderEle.addEventListener('touchstart', function() {
        h1Ele.style.display = 'none';
      })
    }()
  </script>
</body>
</html>
