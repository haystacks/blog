<?php
	
	/**
	 * @ des zip压缩包补丁 更新站点程序
	 * @ author unofficial
	 * @ time 2017-05-03 10:56:32
	 */
	
	// config s
	$dir	= './'; // username目录

	// config e
	
	function patch($value) {
		$zip = new ZipArchive;
		$filename = pathinfo($value, PATHINFO_FILENAME);
		$base = $filename.'/www/';
		if ($zip->open($value) === TRUE && $zip->statName($base)) {
			$rs = $zip->addFile('./patch/phpcms/libs/classes/attachment.class.php', $base.'phpcms/libs/classes/attachment.class.php');
			$zip->addFile('./patch/phpcms/modules/content/down.php', $base.'phpcms/modules/content/down.php');
			$zip->addFile('./patch/phpcms/modules/member/index.php', $base.'phpcms/modules/member/index.php');
			$zip->addFile('./patch/phpcms/modules/pay/respond.php', $base.'phpcms/modules/pay/respond.php');
			$zip->close();
			echo $filename." ok\n";
		} else {
			echo $filename." faild\n";
		}
	}

	function isZip($value) {
		$ext = pathinfo($value, PATHINFO_EXTENSION); 
		if($ext === 'zip') {
			return true;
		} else {
			$filename = pathinfo($value, PATHINFO_FILENAME);
			echo $filename." is not zip\n";
		}
	}

	// 获取目录下的文件夹名称
	$files = scandir($dir);

	// 循环补丁
	foreach ($files as $key => $value) {
		if (isZip($value) === true) {
			patch($value);
		}
	}
?>








