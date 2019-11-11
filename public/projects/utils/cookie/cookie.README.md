## 写入cookie

### 语法 Syntax
> cookie.set();

### 描述
创建或者覆盖一个 cookie

### 参数
`name` 必要  
    要创建或者覆盖的 cookie 的名字（string）  

`value` 必要  
    cookie 的值（string）  

`domain` 可选  
    例如 unofficial.cn 、 .unofficial.cn （包含所有子域名）、blog.unofficial.cn 。如果没有定义，默认当前文档位置的路径的域名部分（string 或 null）

`path` 可选  
    例如 / 、 /message 。如果没有定义默认当前文档位置的路径。（string 或 null）  

`max-age` 可选  
    例如一年为（365*24*60*60），多少秒以后过期。  

`expires` 可选  
    date-in-GMTString-format （ Date.toUTCString() ），如果没有定义，cookie 会在对话结束时过期。  

`secure` 可选  
    cookie 只通过 https 协议传输  