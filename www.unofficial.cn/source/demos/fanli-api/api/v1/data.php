<?php
/**
 * 导入数据
 *
 */
define('IN_API', true);
set_time_limit(90);
error_reporting(E_ALL);
ini_set('display_errors', '1');
ini_set ('memory_limit', '512M');
/** Include PHPExcel_IOFactory */
require_once dirname(__FILE__) . '/../lib/Classes/PHPExcel/IOFactory.php';
require_once('pdo.php');
$date = Date('Y-m-d', time());
$file = "../data/精选优质商品清单(内含优惠券)-{$date}.xls";

if (!file_exists($file)) {
	exit("$file 文件不存在");
}
$objPHPExcel = PHPExcel_IOFactory::load($file);
$activeSheet = $objPHPExcel->getActiveSheet();
$row = $activeSheet->getHighestRow();    // 最大行
$col = $activeSheet->getHighestColumn(); // 最大列
$sqlData = array();

for($i = 2; $i <= $row; $i++) {
	$cellArr = array();
	for($j = 'A'; $j <= $col; $j++) {
		$address = $j.$i; // 单元格坐标
		if(in_array($j, array('A', 'B', 'C', 'G', 'R', 'S', 'T', 'V'))) {
			$cellArr[$j] = $activeSheet->getCell($address)->getFormattedValue();
			if($j === 'R') { // R优惠券面额 G商品价格
				/**
				 * 满*元减*元
				 * *元无条件券
				 */
				$coupon = $cellArr[$j];
				preg_match('/(满(\d+)元减)?(\d+)元?(无条件券)?/', $coupon, $matches);
				if($cellArr['G'] >= $matches[2]) {
					$cellArr['price2'] = $cellArr['G'] - $matches[3];
				} else {
					$cellArr['price2'] = 0;
				}
			}
		}
	}
	$cellStr = implode("', '", $cellArr);
	$sqlData[] = "('$cellStr')";
	// 当$i被100整除或者等于$row的时候执行sql，清除原来的$sqlData;
	if($i % 10 === 0 || $i === $row) {
		$sqlStr = implode(', ', $sqlData);
		$sql = "replace into fanli_api_store(`sid`, `name`, `image`, `price1`, `coupon`, `price2`, `starttime`, `endtime`, `url`) values $sqlStr";
		IPDO::create($sql, null);
		file_put_contents("../datalog/{$date}.log", $i."-".$sql."\r\n\r\n", FILE_APPEND);
		// 重置
		$sqlData = array();
	}
}
