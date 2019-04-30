### Shell 流程控制

sh的流程控制不可为空，如果else分支没有语句执行，就不要写else。

#### if else语法

语法

```shell
if condition1
then
	command1
	command2
	...
	commandN
elif condition2
then
	command_1
	command_2
	....
	command_N
else
	command
fi
```

### for 循环

语法

```shell
for var in item1 item2 item3 ... itemN
do
	command1
	command2
	....
	commandN
done
```

写成一行

```shell
for var in item1 item2 item3 ... itemN; do command1;command2... done;
```

shell 中的 for 循环不仅可以用文章所述的方法,通常情况下 shell 变量调用需要加 $,但是 for 的 (()) 中不需要。

```shell
#!/bin/bash
for((i=1;i<=5;i++));do
    echo "这是第 $i 次调用";
done;
```

#### while 语句

while循环用于不断执行一系列命令，也用于从输入文件中读取数据；命令通常为测试条件。其格式为：

```shell
while condition
do 
	command
done
```

示例：如果ct小于5，那么条件返回真，就执行，知道ct不小于5

```shell
ct=1
while [[ $ct -lt 5 ]]; do
	echo $ct
	let "ct++" #使用了let命令
done
```

使用中使用了 Bash let 命令，它用于执行一个或多个表达式，变量计算中不需要加上 $ 来表示变量

while循环可用于读取键盘信息。下面的例子中，输入信息被设置为变量FILM，按\<Ctrl-D\>结束循环。

```shell
echo '按下<CTRL-D>退出'
echo -n '输入你最喜欢的网站名称'
while read FILM
do 
	echo "是的！$FILM是一个好网站"
done
```

无限循环

```shell
while :
do
    command
done
#或者
while true
do
    command
done
#或者
for (( ; ; ))
```

#### until循环

until 循环执行一系列命令直至条件为 true 时停止。until 循环与 while 循环在处理方式上刚好相反。一般 while 循环优于 until 循环，但在某些时候—也只是极少数情况下，until 循环更加有用。

语法

```shell
until condition
do
    command
done
```

condition 一般为条件表达式，如果返回值为 false，则继续执行循环体内的语句，否则跳出循环。

#### case语句

Shell case语句为多选择语句。可以用case语句匹配一个值与一个模式，如果匹配成功，执行相匹配的命令。

```shell
case 值 in
模式1)
    command1
    command2
    ...
    commandN
    ;;
模式2）
    command1
    command2
    ...
    commandN
    ;;
esac
```

case工作方式如上所示。取值后面必须为单词in，每一模式必须以右括号结束。取值可以为变量或常数。匹配发现取值符合某一模式后，其间所有命令开始执行直至 ;;。

取值将检测匹配的每一个模式。一旦模式匹配，则执行完匹配模式相应命令后不再继续其他模式。如果无一匹配模式，使用星号 * 捕获该值，再执行后面的命令。

示例：

```shell
echo '输入 1 到 4 之间的数字'
echo '你输入的数字为'
read aNum
case $aNum in 
	1) echo '你选择了1'
	;;
	2) echo '你选择了2'
	;;
	3) echo '你选择了3'
	;;
	4) echo '你选择了4'
	;;
	*) echo '你没有输入1 - 4 之间的数字'
	;;
esac
```

#### break 和 continue命令用于跳出循环

break命令允许跳出所有循环（终止执行后面的所有循环）。下面的例子中，脚本进入死循环直至用户输入数字大于5。要跳出这个循环，返回到shell提示符下，需要使用break命令。

```shell
while :
do
    echo -n "输入 1 到 5 之间的数字:"
    read aNum
    case $aNum in
        1|2|3|4|5) echo "你输入的数字为 $aNum!"
        ;;
        *) echo "你输入的数字不是 1 到 5 之间的! 游戏结束"
            break
        ;;
    esac
done
```

####esac

case的语法和C family语言差别很大，它需要一个esac（就是case反过来）作为结束标记，每个case分支用右圆括号，用两个分号表示break。