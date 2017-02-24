CREATE TABLE IF NOT EXISTS `fanli_api_store` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `key` varchar(256) NOT NULL,
  `secrect` varchar(256) NOT NULL,
  `we7key` varchar(256) NOT NULL,
  `we7token` varchar(256) NOT NULL,
  `we7url` varchar(256) NOT NULL,
  `endtime` timestamp default CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=10111 DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS `fanli_api_store` (
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
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

insert into `fanli_api_store` (`sid`, `name`, `image`, `price1`, `price2`, `url`, `starttime`, `endtime`) values('543681677692', '2017新款春装大码格子衬衫女中长款文艺宽松休闲长袖棉麻衬衣女潮', 'http://img04.taobaocdn.com/bao/uploaded/i4/TB174OyOVXXXXXtapXXXXXXXXXX_!!0-item_pic.jpg', 89, 59, 'https://uland.taobao.com/coupon/edetail?e=hrUyWBwP0Ntt3vqbdXnGlk73b7ZrA6f9nxGOiCCvGTODspHV8GnrGhpBwAz9u2FrbeGYy%2FGqR7VhparZ1zhEfB0HgBdG%2FDDL%2F1M%2FBw7Sf%2FeR54x62fvkIfKKo8MYeKYHWHdFGy71vqEr2TejRpyKBhh2de6O%2BP%2FG&pid=mm_27010006_21086165_71160355&af=1', '2017-02-20', '2017-02-28')
