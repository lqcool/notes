//获取镜像地址(原来的为https://registry.npmjs.org/)
> npm get registry
//设置镜像地址(淘宝镜像)
> npm config set registry http：//registry.npm.taobao.org
//安装指定版本的模块
> npm install moduleName@versionNo
//列出全局套件
> npm ls -g
//列出全局套件详细资讯
> npm ls -gl
//列出局部的套件
> cd 项目目录
> npm ls
//列出局部套件详细资讯
> mpm ls -l
//搜寻套件
> npm search <package name>
//卸载全局组件
> npm uninstall <package name> -g
//卸载局部组件
> cd 项目文件夹
> npm uninstall <package name>
//更新全局组件
> npm update -g
//更新局部组件
> cd 项目文件夹
> npm update
//更新node模块
> npm update moduleName
//查看当前包的安装路径
> npm root
//查看全局的包安装路径
> npm root -g
//查看npm 安装版本
> npm -v
//初始化项目（模块）
> npm init
//检查包是否已经过时，此命令会列出所有已经过时的包，可以及时进行包的更新
> npm outdated

//安装express生成器，快速构建express项目(通过应用生成工具express可以快速创建一个应用骨架)
> npm install express-generator -g
//在api文件夹里面生成一个骨架
> express api