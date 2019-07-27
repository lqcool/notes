### Mac操作

1、常见简单目录跳转命令

（1）几个目录文件代表

- “/”：表示根目录
- “～”：用户主目录的缩写，比如当前用户是“lqcool”,那么“～”展开的就是“/Users/lqcool”
- “.”：表示当前目录
- “..”：表示父目录

2、最基本的几个命令

（1）cd + "路径"跳转到某个目录

跳转到根目录： cd ~

上级目录：cd ..

返回上一个访问的目录：cd -

**TIPS:** 在这里有个小技巧，就是在输入目录如Desktop时，只要输入Des并按tab键，该目录名便自动补全了。

（2）ls

- ls ：列出该文件夹下面的所有可见文件
- ls -a：列出该文件夹下面的所有文件（包括隐藏的文件）
- ls -l：显示不隐藏的文件与文件夹的详细信息
- ls -al：显示当前目录下的所有文件及文件夹包括隐藏的.和..等的详细信息

例如列出hello目录下的内容：ls hello

（3）显示当前目录的路径：pwd

（4）清空当前输入：clear

如果Terminal窗口中的内容太多了，可以用clear命令将其清空。

（5）查看输入历史记录：history

（6）删除文件：rm 文件名，删除文件夹：rmdir 文件夹名

（7）将文件拷贝到目标路径下：cp 文件名 目标路径

（8）在终端下查看文件：cat 文件名

（9）新建文件夹：mkdir 文件夹名

（10）使用文本编辑器创建或者编辑文件：vim 文件名



3、快捷键

选择一行到末尾：cmd+shif+->

4、生成ssh公私钥

（1）打开电脑终端

（1）ls -al ～/.ssh 命令检查是否存在ssh key，如果存在，将会列出id_rsa.pub 或 id_dsa.pub文件

（2）如果（2）中没有出现文件，那么直接使用 pbcopy < ~/.ssh/id_rsa.pub 命令将公钥放到剪切板，然后配置到gitlab或者github等等平台的ssh配置中

（3）如果（2）中没有出现文件，那么使用ssh-keygen -t rsa -C "[your_full_name@xxxxx.com](mailto:your_full_name@xxxxx.com)" 命令生成ssh key，邮件是你的公司企业邮件， 默认会在相应路径下（/your_home_path）生成id_rsa和id_rsa.pub两个文件，此时终端会显示：

Generating public/private rsa key pair.

Enter file in which to save the key (/your_home_path/.ssh/id_rsa):

连续回车即可，也可能会让你输入密码，密码就是你的开机密码，到此ssh key生成完成，使用pbcopy < ~/.ssh/id_rsa.pub 进行复制到剪切板，配置。

5、权限相关

在编辑器vscode中打开工作空间，修改文件后发现每次都需要输入密码才能保存【需要sudo】，需要修改权限

`sudo chown -R 当前用户 需要操作的文件夹路径`。例如`sudo chown -R liqiao  /Users/liqiao/Documents/codelife/work/vs-workspace/goods-show`

更多常见的Mac系统操作：https://www.jianshu.com/p/14af11fd370a（参考）