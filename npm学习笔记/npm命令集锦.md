1、获取镜像地址(原来的为https://registry.npmjs.org/)
npm get registry

2、设置镜像地址(淘宝镜像)
npm config set registry http：//registry.npm.taobao.org

3、安装指定版本的模块
npm install moduleName@versionNo

4、列出全局套件
npm ls -g

5、列出全局套件详细资讯
npm ls -gl

6、列出局部的套件
cd 项目目录
npm ls

7、列出局部套件详细资讯
mpm ls -l

8、搜寻套件
npm search <package name>

9、卸载全局组件
npm uninstall <package name> -g

11、卸载局部组件
cd 项目文件夹
npm uninstall <package name>

12、更新全局组件
npm update -g

13、更新局部组件
cd 项目文件夹
npm update

14、更新node模块
npm update moduleName

15、查看当前包的安装路径
npm root

16、查看全局的包安装路径
npm root -g

17、查看npm 安装版本
npm -v

18、初始化项目（模块）
npm init

19、检查包是否已经过时，此命令会列出所有已经过时的包，可以及时进行包的更新
npm outdated

20、安装express生成器，快速构建express项目(通过应用生成工具express可以快速创建一个应用骨架)
npm install express-generator -g

21、在api文件夹里面生成一个骨架
express api

npm中的-D参数是--save-dev简写

npm install xxx --save-dev 等价于 npm install xxx -D