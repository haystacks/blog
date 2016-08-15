title: windows下mysql多端口？ 
date: 2016-2-1
---
<!-- more -->
##### 如何在windows下mysql多端口？  
1. 安装的有mysql（d:/mysql）  
2. 复制mysql安装目录下的内容到新建目录（d:/mysqlother）下   
3. 添加（d:/mysqlother）的bin目录到环境变量  
4. 修改配置文件my.ini的端口配置以及basedir，datadir  
5. 运行命令行生成mysqlother服务  


##### 新建服务
`
mysqld-nt install mysqlother --defaults-file='d:/mysqlother/my.ini'
`
##### 移除服务
`
mysqld-nt remove mysqlother
`