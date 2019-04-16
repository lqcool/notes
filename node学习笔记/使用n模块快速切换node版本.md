### Node 快速切换版本，版本回退和版本更新模块n

1、安装node版本管理模块n

`sudo npm install n -g`

2、进行node版本的安装或者切换

`sudo n stable`(安装稳定版)

`sudo n latest`(安装最新版)

`sudo n 版本号`(安装指定版本[升级、降级])，例如安装node 8.11.1使用命令`sudo n 8.11.1`

`n`(检查目前安装了哪些版本的node)

`n 版本号`(切换版本，不会删除已经安装了的其他版本)，例如切换到node 8.11.1使用命令`n 版本号`

`sudo n rm 版本号`(删除版本)

