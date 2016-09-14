title: coding webide for win
---
* 1
```
"build": "NODE_ENV=production ./node_modules/.bin/webpack"
↓↓↓
"build": "set NODE_ENV=production ./node_modules/.bin/webpack"
```

* 2 mvn and jdk
    * 安装mvn [download](http://maven.apache.org/download.cgi) → http://apache.fayea.com/maven/maven-3/3.3.9/binaries/apache-maven-3.3.9-bin.zip
    * 设置环境变量PATH → eg → D:\soft\apache-maven-3.3.9\bin
    * 安装jdk
    * 设置环境变量JAVA_HOME → eg → D:\soft\jre8

* 3 Failed to execute goal org.apache.maven.plugins:maven-antrun-plugin:1.8:run (default) on project frontend: An Ant BuildException has occured: