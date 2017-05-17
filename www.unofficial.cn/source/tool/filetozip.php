<?php
	
	/**
	 * @ des zip压缩包补丁 更新站点程序
	 * @ author unofficial
	 * @ time 2017-05-03 10:56:32
	 * @ update 2017-05-16 17:10:17
	 */
	
	// config s
	$dir	= './'; // username目录

	// config e
		/**
	 * 获取当前目录及子目录下的所有文件
	 * @param string $dir 路径名
	 * @return array 所有文件的路径数组
	 */
	function get_files($dir) {
		$files = array();
	 
		if(!is_dir($dir)) {
			return $files;
		}
		$handle = opendir($dir);
		if($handle) {
			while(false !== ($file = readdir($handle))) {
				if ($file != '.' && $file != '..') {
					$filename = $dir . "/"  . $file;
					if(is_file($filename)) {
						$files[] = $filename;
					}else {
						$files = array_merge($files, get_files($filename));
						// dir -- new
						// $files[] = $filename.'/';
					}
				}
			}   //  end while
			closedir($handle);
		}
		// dir -- new
		// $files[] = $dir.'/';
		return $files;
	}   //  end function
	
	function patch($value) {
		$zip = new ZipArchive;
		$filename = pathinfo($value, PATHINFO_FILENAME);
		// mobile
		$base = $filename.'/www/';
		// pc
		// $base = $filename.'/'.substr($filename, 2).'/';

		$patchPath = './patch';
		if ($zip->open($value) === TRUE && $zip->statName($base)) {
			foreach (get_files('./patch') as $key => $value) {
				$rs = $zip->addFile($value, $base.str_replace($patchPath.'/', '', $value));
			}
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








