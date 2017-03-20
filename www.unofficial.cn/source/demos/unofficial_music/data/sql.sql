CREATE TABLE IF NOT EXISTS `ims_unofficial_music` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` varchar(256) DEFAULT NULL COMMENT '用户ID',
  `blessing` text DEFAULT NULL COMMENT '祝福',
  `mid` varchar(50) DEFAULT NULL COMMENT '歌曲ID',
  `time` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1024;

CREATE TABLE IF NOT EXISTS `ims_unofficial_music_detail` (
  `mid` varchar(50) DEFAULT NULL COMMENT '歌曲ID',
  `title` varchar(256) DEFAULT NULL COMMENT '歌名',
  `author` varchar(256) DEFAULT NULL COMMENT '歌手',
  `link` text DEFAULT NULL COMMENT '歌曲ID',
  `time` timestamp DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY `mid` (`mid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;