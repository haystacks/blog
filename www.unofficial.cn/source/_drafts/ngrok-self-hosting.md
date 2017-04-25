---
title: ngrok self hosting
date: 2017-04-25
categories:
- 学习
tags:
- ngrok
---
前面实现了《[模拟登录淘宝]()》，后面发现登录验证的规则又变化了，距离大致相差一月，在原来的基础上增加了一些交互操作上的验证。做好的功能基本运行正常了，本地测试通过，部署到服务器上的时候，发现了一个异地登录的验证，这个会收到一条验证码来验证，对于这个过程就不是很好弄了，如果要强制这样做也能，只是有登录时效，这样一来操作就太复杂了。  
为了缓解这个尴尬，我想到了两个办法：  
* 购买一个本地服务器
    这个办法没有经过测试，理论上应该是可行的，相当于我在常用地的另外一台电脑使用。我试着查阅了一下本地服务器的价格，我觉得我还是放弃了吧，不划算，开支两台服务器的费用让我一开始有些力不从心。  

* [ngrok]() 
    开源的内网穿透技术，我在自用电脑上运行这个服务，然后对外提供接口，放在服务器上的程序直接请求自用电脑上的这个服务，问题也就迎刃而解了。
<!-- more -->
### 什么是 ngrok
I want to expose a local server behind a NAT or firewall to the internet。详阅[ngrok](https://github.com/inconshreveable/ngrok)  

### 安装前的硬件准备工作
* 有公网服务能力的服务器一台
* 有所有权的域名一个

### 安装前的服务端准备工作
* 运行环境基于 Go,所以需要安装 Go
```
sudo yum install golang
```

* 检测是否安装成功
```
go version
```

* 下载 ngrok 源码
```
git clone https://github.com/inconshreveable/ngrok.git
```

* 准备一个可访问的域名
例如我准备了一个 ngrok.unofficial.cn ，把 ngrok 解析到自己的服务器上

* 生成自签名证书
```
NGROK_DOMAIN="ngrok.unofficial.cn"
openssl genrsa -out base.key 2048
openssl req -new -x509 -nodes -key base.key -days 10000 -subj "/CN=$NGROK_DOMAIN" -out base.pem
openssl genrsa -out server.key 2048
openssl req -new -key server.key -subj "/CN=$NGROK_DOMAIN" -out server.csr
openssl x509 -req -in server.csr -CA base.pem -CAkey base.key -CAcreateserial -days 10000 -out server.crt
```

* 拷贝证书替换原有系统证书
```
cp base.pem assets/client/tls/ngrokroot.crt
cp server.crt assets/server/tls/snakeoil.crt
cp server.key assets/server/tls/snakeoil.key
```

备注：生成自签名证书与拷贝证书 均在 ngrok 项目目录下执行  

### 编译服务端与客户端
* 编译服务端
```
make release-server release-client
```
上述命令编译得到的 client 版本是 linux 版本，如果我要在 windows 上使用呢？可以如下命令编译  
```
GOOS=windows GOARCH=amd64 make release-client
```

### 服务端运行 ngrok
* 启动服务器端ngrokd
```
./bin/ngrokd -tlsKey="server.key" -tlsCrt="server.crt" -domain="ngrok.unofficial.cn" -httpAddr=":8081" -httpsAddr=":8082"
```

### 客户端运行 ngrok
* 创建配置文件
```
server_addr: "ngrok.unofficial.cn:4443"
trust_host_root_certs: false
```

* windows_amd64 目录下运行 ngrok.exe
```
# 3333 为自己本地应用端口
ngrok -log=ngrok.log -config=ngrok.cfg 3333
```

### 自签名证书浏览器不认识
准备尝试一下免费的证书

### nginx ngrok 80
按照上面的配置来看，tunnel 没有开在80端口上，微信上使用的时候，可能需要80端口，如何利用 nginx 使用的80端口来进行转发
```
map $scheme $proxy_port {
    "http"  "8081";
    "https" "8082";
    default "8081";
}

server {
    listen      80;
    listen      [::]:80;
    listen      443;
    listen      [::]:443;
    server_name ngrok.unofficial.cn *.ngrok.unofficial.cn;

    location / {
        proxy_pass  $scheme://127.0.0.1:$proxy_port;
    }

    ssl on;
    ssl_certificate /root/www/ngrok/server.crt;
    ssl_certificate_key /root/www/ngrok/server.key;

    proxy_set_header    X-Real-IP $remote_addr;
    proxy_set_header    Host $http_host:$proxy_port;
    proxy_set_header    X-Forwarded-For $proxy_add_x_forwarded_for;

    access_log off;
    log_not_found off;
}
```
