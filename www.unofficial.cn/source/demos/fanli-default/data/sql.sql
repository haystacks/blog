SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `fanli.unofficial.cn`
--

-- --------------------------------------------------------

--
-- 表的结构 `ims_fanli_setting`
--

CREATE TABLE IF NOT EXISTS `ims_fanli_setting` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `apikey` varchar(256) DEFAULT NULL,
  `apisecrect` varchar(256) DEFAULT NULL,
  `token` varchar(256) DEFAULT NULL,
  `authtime` int(10) unsigned NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '认证时间戳',
  `createtime` timestamp DEFAULT CURRENT_TIMESTAMP COMMENT '注册时间',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `ims_fanli_store`
--

CREATE TABLE IF NOT EXISTS `ims_fanli_store` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `sid` varchar(20) NOT NULL,
  `name` varchar(200) NOT NULL,
  `image` varchar(200) NOT NULL,
  `price1` float(6, 2) NOT NULL,
  `price2` float(6, 2) NOT NULL,
  `url` varchar(300) NOT NULL,
  `starttime` char(10) NOT NULL,
  `endtime` char(10) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `sid` (`sid`)
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;;
