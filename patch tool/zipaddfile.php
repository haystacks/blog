<?php

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

	// var_dump(get_files('phpsso_server')[0]);
	// exit;
	$zip = new ZipArchive;
	function zipAdd( $dir, $filename, $zip ) {
		// pc 模板
		// $path = $filename.'/'.substr($filename,2).'/';
		// mobile 模板
		$path = $filename.'/www/';
		if ($zip->open($dir.'/'.$filename.'.zip') === TRUE && $zip->locateName($path) !== false) {
			foreach (get_files('phpcms') as $key => $value) {
				$zip->addFile($value, $path.$value);
			}
			// $zip->addFile('phpsso_server/phpcms/libs/classes/image.class.php', $path.'phpsso_server/phpcms/libs/classes/image.class.php');
			// $zip->addFile('phpsso_server/phpcms/libs/functions/dir.func.php', $path.'phpsso_server/phpcms/libs/functions/dir.func.php');
			// $zip->addFile('phpsso_server/phpcms/modules/phpsso/classes/phpsso.class.php', $path.'phpsso_server/phpcms/modules/phpsso/classes/phpsso.class.php');
			// $zip->addFile('phpsso_server/phpcms/modules/phpsso/index.php', $path.'phpsso_server/phpcms/modules/phpsso/index.php');
			// $zip->addFile('phpsso_server/statics/images/main.swf', $path.'phpsso_server/statics/images/main.swf');
			// $zip->addFile('statics/js/eWebEditorv/php/upload.php', $path.'statics/js/eWebEditorv/php/upload.php');
			

			
			// del phpsso
			// $files = get_files('phpsso_server');
			// foreach ($files as $key => $value) {
			// 	$zip->deleteName($path.$value);
			// }

			// // del phpsso
			// $zip->deleteName($path.'api/phpsso.php');

			// // del eWebEditorv
			// $files = get_files('statics');
			// foreach ($files as $key => $value) {
			// 	$zip->deleteName($path.$value);
			// }

			$zip->close();
			echo $filename."ok\n";
		} else {
			echo $filename."faild\n";
		}
	}


	$dir	= 'D:/www/update/file';
	$files = scandir($dir);
	foreach ($files as $key => $value) {
		if ($value != '.' && $value != '..') {
			$filename = basename($value, '.zip');
			zipAdd($dir, $filename, $zip);
		}
	}
?>








