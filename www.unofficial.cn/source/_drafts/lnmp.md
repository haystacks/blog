---
title: lnmp编译安装
date: 2017-04-02
categories:
- 学习
tags:
- lnmp
---
3月最后一天一咬牙一跺脚续费了3年，重装lnmp环境的时候，由于对php的版本有特殊需求，编译安装php始终不能支持mysql，最后只好再次重头再来，总是希望做好是一件困难的事情，先再尝试一次，最后用docker来再试试。  
<!-- more -->

1、 下载 nginx
2、 下载 php
3、 下载 mysql

yum 安装 mysql
configure: error: Cannot find libmysqlclient under /usr.
Note that the MySQL client library is not bundled anymore!

Then I saw that libmysql client was in /usr/lib64/ instead of /usr/lib/. So the right way to run configure is:
./configure --with-mysql=/usr/bin/ --with-libdir=lib64

tar 解压安装 tar -xzvf file.tar.gz


http -> https
[root@iZbp1glyauov01g066icltZ nginx]# certbot certonly
Traceback (most recent call last):
  File "/usr/bin/certbot", line 9, in <module>
    load_entry_point('certbot==0.12.0', 'console_scripts', 'certbot')()
  File "/usr/lib/python2.7/site-packages/pkg_resources.py", line 378, in load_entry_point
    return get_distribution(dist).load_entry_point(group, name)
  File "/usr/lib/python2.7/site-packages/pkg_resources.py", line 2566, in load_entry_point
    return ep.load()
  File "/usr/lib/python2.7/site-packages/pkg_resources.py", line 2260, in load
    entry = __import__(self.module_name, globals(),globals(), ['__name__'])
  File "/usr/lib/python2.7/site-packages/certbot/main.py", line 21, in <module>
    from certbot import client
  File "/usr/lib/python2.7/site-packages/certbot/client.py", line 10, in <module>
    from acme import client as acme_client
  File "/usr/lib/python2.7/site-packages/acme/client.py", line 31, in <module>
    requests.packages.urllib3.contrib.pyopenssl.inject_into_urllib3()
  File "/usr/lib/python2.7/site-packages/requests/packages/urllib3/contrib/pyopenssl.py", line 112, in inject_into_urllib3
    _validate_dependencies_met()
  File "/usr/lib/python2.7/site-packages/requests/packages/urllib3/contrib/pyopenssl.py", line 147, in _validate_dependencies_met
    raise ImportError("'pyOpenSSL' module missing required functionality. "
ImportError: 'pyOpenSSL' module missing required functionality. Try upgrading to v0.14 or newer.


解决办法： 
http://rpm.pbone.net/index.php3/stat/4/idpl/31446026/dir/centos_7/com/pyOpenSSL-0.15.1-1.el7.noarch.rpm.html

wget ftp://ftp.muug.mb.ca/mirror/centos/7.2.1511/cloud/x86_64/openstack-mitaka/common/pyOpenSSL-0.15.1-1.el7.noarch.rpm
sudo rpm -Uvh pyOpenSSL-0.15.1-1.el7.noarch.rpm
sudo yum install certbot
