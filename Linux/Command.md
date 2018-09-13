## Command

 ls：显示当前目录下的文件

 ls -l：显示当前目录下文件的详细信息

 ll：显示当前目录下文件的详细信息，与ls -l作用一样
 cat 命令用于连接文件并打印到标准输出设备上。

移动文件：`sudo mv 文件(文件夹)名称 目标文件夹`，例如移动jdk1.8到/usr/local/java中`sudo mv jdk1.8 /usr/local/java`

删除文件：`rm -rf 目标文件（或者文件夹）`，例如删除当前目录的ddd：`sudo -rf dd`

编辑profile文件：`sudo gedit /etc/profile`

使得profile文件生效：`source /etc/profile`

解压文件：`tar -xzvf  name.tar.gz`

创建目录：`mkdir java`创建一个java文件

设置java文件夹目录的操作权限：`sudo chmod 777 java`所有用户都具有最高操作权限

