<?php
	/**
	 * 文件追加内容
	 * 2014-12-16 17:17:38
	 */
	class FileAddContent {

		public $pattern = array('/百都/', '/百度/', '/cdbaidu/', '/96539/', '/人民南路四段45号/', '/新希望大厦20楼/', '/15281054795/', '/cddxgg/', '/85288883/', '/85288835/', '/13882231854/', '/中誉科技/', '/wuhan/', '/400-646-446/', '/264712403/', '/1159942991/', '/沈阳/', '/和平三好/', '/华强广场/', '/96877/', '/85238885/', '/85634574/', '/10203788/', '/65256964/', '/65190632/', '/86032081/', '/860881651/', '/2552552/', '/s:50:/', '/s:12:/', '/135515168572/', '/4004004000/', '/13551516857/');
		
		public $replacement = array('XXXX', 'XXXX', 'XXXX', 'XXXX', 'XXXX路X段X号', 'XXXX大厦X楼', 'XXXX', 'XXXX', 'XXXX', 'XXXX', 'XXXX', 'XXXX', 'XXXX', 'XXXX', 'XXXX', 'XXXX', 'XXXX', 'XXXX', 'XXXX', 'XXXX', 'XXXX', 'XXXX', 'XXXX', 'XXXX', 'XXXX', 'XXXX', 'XXXX', 'XXXX', 's:42:', 's:10:', '', '', '');
		
		// public $pattern = "/'admin_log' => 0,/";
		// public $replacement = "'admin_log' => 1,";

		public function __construct() {
			set_time_limit(3600);
			$this -> zip = new ZipArchive();
		}

		//追加内容
		public function addContent($contents, $conPath) {
			$newContents = preg_replace($this->pattern, $this->replacement, $contents);
			if($contents != $newContents) {
				echo $conPath."\n";
				$rs = $this -> zip -> addFromString($conPath, $newContents);
			}
		}

		public function traverse($path = '.') {
			$current_dir = opendir($path);
			while(($file = readdir($current_dir)) !== false) {
				$sub_dir = $path . DIRECTORY_SEPARATOR . $file;

				if($file == '.' || $file == '..') {
					continue;
				} else {//追加内容
					if($this -> zip -> open($path.DIRECTORY_SEPARATOR.$file)===TRUE){
						$f = explode('.', $file);
						
						// baiyuncms 1.10.13
						// $conPath = $f[0].'/install/main/phpcms_db.sql';
						// config
						// $conPath = $f[0].'/caches/configs/system.php';
						
						// phpcms mobile
						$conPath = $f[0].'/www/install/main/phpcms_db.sql';
						// config
						// $conPath = $f[0].'/www/caches/configs/system.php';
						
						// phpcms lv 
						// $conPath = $f[0].'/install/main/phpcms_db.sql';
						// config
						// $conPath = $f[0].'/caches/configs/system.php';
						
						// phpcms pc
						// $num = substr($f[0],2);
						// $conPath = $f[0].'/'.$num.'/install/main/phpcms_db.sql';
						// config
						// $conPath = $f[0].'/'.$num.'/caches/configs/system.php';
						
						// sitemaster
						// $conPath = $f[0].'_2_sample.sql';
						
						$content = $this -> zip -> getFromName($conPath);
						$this -> addContent($content, $conPath);
						// echo $f[0]."\n";
						$this -> zip -> close();//关闭处理的zip文件
					}
				}
			}
			echo "OK";
		}

	}
	$file = new FileAddContent();
	$file -> traverse('./file/');
?>