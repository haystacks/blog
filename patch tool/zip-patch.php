<?php
	
	/**
	 * @ des zip压缩包补丁 更新站点程序
	 * @ author unofficial
	 * @ time 2016-2-24 16:59:19
	 */
	
	// config s
	
	$patchName = 'patch'; // 补丁名称
	$dir	= './'; // username目录

	// config e
	
	function patch($dir, $patchName, $filename, $zip) {
		// 
		if ($zip->open($dir.$patchName.'.zip') === TRUE) {
			// 解压文件
			$destWww = $dir.$filename.'/www/';
			$destWeb = $dir.$filename.'/web/';
			$dest = is_dir($destWww) ? $destWww : (is_dir($destWeb) ? $destWeb : 0);
			if($dest) {
				$zip->extractTo($dest);
				echo $filename."ok\n";
			} else {
				echo $filename."faild\n";
			}
			
			$zip->close();
		} else {
			echo $filename."faild\n";
		}
	}

	// 获取目录下的文件夹名称
	$files = scandir($dir);

	// 调用zip
	$zip = new ZipArchive;

	// 循环补丁
	foreach ($files as $key => $value) {
		if ($value != '.' && $value != '..' && is_dir($value)) {
			$filename = basename($value);
			patch($dir, $patchName, $filename, $zip);
		}
	}
?>








