### SHELL 简介

Shell 是一个用 C 语言编写的程序，它是用户使用 Linux 的桥梁。Shell 既是一种命令语言，又是一种程序设计语言。

话不多说，一个shell实例进行解释，编写下面一个脚本，并保存名为`lq.sh`,同时运行下面脚本将会创建10个txt文件

```shell
#!/bin/sh
cd ~
mkdir shell_tut
cd shell_tut

for ((i=0; i < 10; i ++)); do
	touch test_$i.txt
done
```

**#!** 是一个约定的标记，它告诉系统这个脚本需要什么解释器来执行，即使用哪一种 Shell。

shell脚本第一行一般以`#!/bin/sh`或者`#!/usr/bin/php`或者其他解释器开头，用于指定运行这个脚本运用的脚本解释器，如果通过脚本解释器直接运行脚本，切将脚本文件作为参数运行，那么第一行就不会起作用。紧随第一行之后的内容就是shell脚本的内容

#### 运行脚本(包括两种方式)

(1)作为可执行程序运行

 ```shell
chmod +x ./lq.sh #使脚本具有执行权限
./lq.sh #运行脚本(这样运行的前提是当前所处目录就是脚本文件所在的目录)
 ```

(2)作为解释器参数运行

```shell
/bin/sh lq.sh #这个时候脚本文件作为了/bin/sh脚本解释器的参数
```

### SHELL 基础

#### Shell变量

变量的类型，运行shell时，会同时存在三种变量

- **1) 局部变量** 局部变量在脚本或命令中定义，仅在当前shell实例中有效，其他shell启动的程序不能访问局部变量。
- **2) 环境变量** 所有的程序，包括shell启动的程序，都能访问环境变量，有些程序需要环境变量来保证其正常运行。必要的时候shell脚本也可以定义环境变量。
- **3) shell变量** shell变量是由shell程序设置的特殊变量。shell变量中有一部分是环境变量，有一部分是局部变量，这些变量保证了shell的正常运行

定义变量不用`$`，使用变量使用​`$`

1、定义变量时，变量名不加美元符号（$，PHP语言中变量需要），如：

```shell
your_name="lqcool"
```

定义变量的规则

- 变量名称和等号之间不能有空格
- 命名只能使用英文字母，数字和下划线，首个字符不能以数字开头。
- 中间不能有空格，可以使用下划线（_）。
- 不能使用标点符号。
- 不能使用bash里的关键字（可用help命令查看保留关键字）。

2、使用变量

使用一个定义过的变量，只要在变量名前面加美元符号即可，如：

```shell
#!/bin/bash
your_name="lqcool"
echo $your_name
echo ${your_name}
```

变量名外面的花括号是可选的，加不加都行，加花括号是为了帮助解释器识别变量的边界，如下所示：

```shell
for skill in Ada Coffe Action Java; do
	echo "I am good at ${skill}Script"
done
```

将会有如下输出

```
I am good at AdaScript
I am good at CoffeScript
I am good at ActionScript
I am good at JavaScript
```

3、只读变量 `readonly`命令 `readonly variablename`

使用 readonly 命令可以将变量定义为只读变量，只读变量的值不能被改变。

```shell
#!/bin/bash
your_name="lqcool"
readonly your_name
your_name="ddd" #将会报错(This variable is read only)
```

4、删除变量 `unset` 命令 `unset variablename` 变量删除之后不能再次使用 `unset`命令不能删除只读变量



