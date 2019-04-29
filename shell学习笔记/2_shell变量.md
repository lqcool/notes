###Shell变量

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

5、Shell字符串

字符串是shell编程中最常用最有用的数据类型（除了数字和字符串，也没啥其它类型好用了），字符串可以用单引号，也可以用双引号，也可以不用引号。

(1)字符串的声明

```shell
str1=STR1
str2='STR1'
str3="STR3"
```

单引号字符串的限制：

- 单引号里的任何字符都会原样输出，单引号字符串中的变量是无效的；
- 单引号字串中不能出现单独一个的单引号（对单引号使用转义符后也不行），但可成对出现，作为字符串拼接使用。

双引号的优点：

- 双引号里可以有变量
- 双引号里可以出现转义字符

```shell
your_name="runoob"
# 使用双引号拼接
greeting="hello, "$your_name" !"
greeting_1="hello, ${your_name} !"
echo $greeting  $greeting_1 #结果：hello, runoob ! hello, runoob !
# 使用单引号拼接
greeting_2='hello, '$your_name' !'
greeting_3='hello, ${your_name} !'
echo $greeting_2  $greeting_3 #结果：hello, runoob ! hello, ${your_name} !
```

(2)字符串长度`${#str_name}`

(3)提取子字符串`${str_name:beginIndex:endIndex}` 获取到的是字符串`str_name`中`beginIndex`到`endIndex`的子串，不包括`endIndex`，也就是左闭右开的区间。

6、Shell数组

bash支持一维数组（不支持多维数组），并且没有限定数组的大小。获取数组中的元素要利用下标，下标可以是整数或算术表达式，其值应大于或等于 0。

(1)数组定义

在 Shell 中，用括号来表示数组，数组元素用"空格"符号分割开。定义数组的一般形式为：

```shell
array_name=(1 2 3 4 5 6)
#或者
array_name=(
1
2
)
#单独定义数组的分量 可以不使用连续的下标，而且下标的范围没有限制。
array_name[0]=value0 
array_name[1]=value1
array_name[n]=valuen
```

(2)读取数组

- 读取单个元素：`${array_name[n]}`
- 获取数组所有元素：`${array_name[@]}`

(3)获取数组长度，和字符串差不多用法

- 获取单个元素：`${#array_name[n]}`
- 获取整个数组长度：`${#array_name[@]}`或者`${#array_name[*]}`

7、Shell注释

单行注释

```shell
# this is the comments
# this is the comments
```

多行注释

```shell
:<<EOF
this is the comments
this is the comments
EOF
#也可以是其他的符号
:<<'
this is the comments
this is the comments
'
#或者
:<<!
this is the comments
this is the comments
!
```

