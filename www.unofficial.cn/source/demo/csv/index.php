<?php

use League\Csv\Reader;

require './vendor/autoload.php';
$reader = Reader::createFromPath('pro.csv');

// some array
$jpg = array();
$png = array();
$gif = array();
$oth = array();

// sql array
$sql_arr = array();

// sql start
$sql_s = 'INSERT INTO `sm_products` (`name`, `i_order`, `feature_img`, `feature_smallimg`, `introduction`, `description`, `price`, `discount_price`, `delivery_fee`, `online_orderable`, `recommended`, `create_time`, `product_category_id`, `s_locale`, `pub_start_time`, `pub_end_time`, `published`, `for_roles`, `is_seo`, `meta_key`, `meta_desc`) VALUES';

// description
function setDescription($name, $xlh, $enname, $cas, $cpcd, $cpgg, $cpbz = '', $other) {
    return "<div style=\"font-family:微软雅黑, Tahoma, Verdana, Arial, sans-serif;white-space:normal;background-color:#FFFFFF;color:#5C9A00;width:763px;text-align:center;font-size:16px;padding:5px 0px 20px;\">{$name}</div>
    <table class=\"row\" cellpadding=\"0\" cellspacing=\"0\" style=\"color:#000000;font-family:微软雅黑, Tahoma, Verdana, Arial, sans-serif;font-size:12px;background-color:#FFFFFF;width:762px;\">
        <tbody>
            <tr>
                <td class=\"title\" style=\"line-height:24px;font-family:微软雅黑, Tahoma, Verdana, Arial, sans-serif;width:60px;text-align:center;border:1px solid #DADADA;height:30px;padding:0px 10px;\">
                产品序号： </td>
                <td style=\"line-height:24px;font-family:微软雅黑, Tahoma, Verdana, Arial, sans-serif;border:1px solid #DADADA;height:30px;padding:0px 10px;\">
                </td>
                <td rowspan=\"8\" style=\"line-height:24px;font-family:微软雅黑, Tahoma, Verdana, Arial, sans-serif;border:1px solid #DADADA;height:30px;padding:0px 10px 0px 0px;width:335px;text-align:center;\">
                <img height=\"199px\" src=\"/upload/image/20160920/1474379225.png\" style=\"padding:0px;margin:0px;\" /> {$xlh} </td>
            </tr>
            <tr>
                <td class=\"title\" style=\"line-height:24px;font-family:微软雅黑, Tahoma, Verdana, Arial, sans-serif;width:60px;text-align:center;border:1px solid #DADADA;height:30px;padding:0px 10px;\">
                产品名称： </td>
                <td style=\"line-height:24px;font-family:微软雅黑, Tahoma, Verdana, Arial, sans-serif;border:1px solid #DADADA;height:30px;padding:0px 10px;\">
                {$name} </td>
            </tr>
            <tr>
                <td class=\"title\" style=\"line-height:24px;font-family:微软雅黑, Tahoma, Verdana, Arial, sans-serif;width:60px;text-align:center;border:1px solid #DADADA;height:30px;padding:0px 10px;\">
                英文名称： </td>
                <td style=\"line-height:24px;font-family:微软雅黑, Tahoma, Verdana, Arial, sans-serif;border:1px solid #DADADA;height:30px;padding:0px 10px;\">
                {$enname} </td>
            </tr>
            <tr>
                <td class=\"title\" style=\"line-height:24px;font-family:微软雅黑, Tahoma, Verdana, Arial, sans-serif;width:60px;text-align:center;border:1px solid #DADADA;height:30px;padding:0px 10px;\">
                CAS&nbsp;&nbsp;&nbsp;号： </td>
                <td style=\"line-height:24px;font-family:微软雅黑, Tahoma, Verdana, Arial, sans-serif;border:1px solid #DADADA;height:30px;padding:0px 10px;\">
                {$cas} </td>
            </tr>
            <tr>
                <td class=\"title\" style=\"line-height:24px;font-family:微软雅黑, Tahoma, Verdana, Arial, sans-serif;width:60px;text-align:center;border:1px solid #DADADA;height:30px;padding:0px 10px;\">
                产品纯度： </td>
                <td style=\"line-height:24px;font-family:微软雅黑, Tahoma, Verdana, Arial, sans-serif;border:1px solid #DADADA;height:30px;padding:0px 10px;\">
                {$cpcd} </td>
            </tr>
            <tr>
                <td class=\"title\" style=\"line-height:24px;font-family:微软雅黑, Tahoma, Verdana, Arial, sans-serif;width:60px;text-align:center;border:1px solid #DADADA;height:30px;padding:0px 10px;\">
                产品规格： </td>
                <td style=\"line-height:24px;font-family:微软雅黑, Tahoma, Verdana, Arial, sans-serif;border:1px solid #DADADA;height:30px;padding:0px 10px;\">
                {$cpgg} </td>
            </tr>
            <tr>
                <td class=\"title\" style=\"line-height:24px;font-family:微软雅黑, Tahoma, Verdana, Arial, sans-serif;width:60px;text-align:center;border:1px solid #DADADA;height:30px;padding:0px 10px;\">
                产品备注： </td>
                <td style=\"line-height:24px;font-family:微软雅黑, Tahoma, Verdana, Arial, sans-serif;border:1px solid #DADADA;height:30px;padding:0px 10px;\">
                {$cpbz} </td>
            </tr>
            <tr>
                <td class=\"title\" style=\"line-height:24px;font-family:微软雅黑, Tahoma, Verdana, Arial, sans-serif;width:60px;text-align:center;border:1px solid #DADADA;height:30px;padding:0px 10px;\">
                产品价格： </td>
                <td style=\"line-height:24px;font-family:微软雅黑, Tahoma, Verdana, Arial, sans-serif;border:1px solid #DADADA;height:30px;padding:0px 10px;\">
                <a href=\"http://wpa.qq.com/msgrd?v=3&amp;uin=1473003328&amp;site=qq&amp;menu=yes\" target=\"_blank\" style=\"color:#000000;text-decoration:none;\">点击咨询{$cas}价格</a>
                </td>
            </tr>
        </tbody>
    </table>
    {$other}
    ";
}

// 字符串转换
function charsetToUTF8($mixed) {
    if (is_array($mixed)) {
        foreach ($mixed as $k => $v) {
            if (is_array($v)) {
                $mixed[$k] = charsetToUTF8($v);
            } else {
                $encode = mb_detect_encoding($v, array('ASCII', 'UTF-8', 'GB2312', 'GBK', 'BIG5'));
                if ($encode == 'EUC-CN' || $encode == 'CP936') {
                    $mixed[$k] = iconv('GBK', 'UTF-8', $v);
                }
            }
        }
    } else {
        $encode = mb_detect_encoding($mixed, array('ASCII', 'UTF-8', 'GB2312', 'GBK', 'BIG5'));
        if ($encode == 'EUC-CN' || $encode == 'CP936') {
            $mixed = iconv('GBK', 'UTF-8//IGNORE', $mixed);
        }
    }
    return $mixed;
}

// $fp = fopen('./oth.md', 'a+');
foreach ($reader as $index => $row) { // 1662    
    // 
    // 编码转换 EUC-CN -> UTF-8
    // 
    if(strpos($row[0], '.png')) {
        // 第一次分割为 ‘		100	\|0\|	(\d+\.?)+\.png	’ 619
        $png[] = $index;
        // fwrite($fp, charsetToUTF8($row[0]));
    } elseif(strpos($row[0], '.jpg')) {
        // 第一次分割为 ‘		100	\|0\|	(\d+\.?)+\.jpg	’ 894
        $jpg[] = $index;
        // fwrite($fp, charsetToUTF8($row[0]));
    } elseif(strpos($row[0], '.gif')) {
        // 第一次分割为 ‘		100	\|0\|	(\d+\.?)+\.gif	’ 56
        $gif[] = $index;
        // fwrite($fp, charsetToUTF8($row[0]));
    } else { // 图片为空
        // 第一次分割为 ‘		100	\|0\|	0?	’ 93
        $oth[] = $index;
        // fwrite($fp, charsetToUTF8($row[0]));
    }
    // 存入sql数组
    // $description = setDescription($name, $xlh, $enname, $cas, $cpcd, $cpgg, $cpbz = '', $other);
    // $now = time();
    // $sql_arr[] = "('{$name}', 4, '{$feature_img}', '{$feature_img}', '', '{$description}', 0.00, 0.00, 0.00, '0', '0', {$now}, 231, 'zh_CN', -1, -1, '1', '{member}{admin}{guest}', '0', NULL, NULL)";
}
// fclose($fp);