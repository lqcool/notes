### Shell echo命令

echo指令用于字符串的输出`echo string`，还可以使用echo实现更复杂的输出格式控制。

(1)显示普通字符

```shell
echo "It is a test"
#双引号可以省略
echo It is a test
```

(2)显示转义字符

```shell
echo "\" It is a test \""
```

(3)显示变量

```shell
#!/bin/sh
read name 
echo "$name It is a test"
```

(4)显示换行

```shell
echo -e "OK! \n" # -e 开启转义
echo "It is a test"
```

(5)显示不换行

```shell
#!/bin/sh
echo -e "OK! \c" # -e 开启转义 \c 不换行
echo "It is a test"
```

(6)显示结果定向至文件

```shell
echo "It is a test" > myfile
```

(7)原样输出字符串，不进行转义或取变量（用单引号）

```shell
echo '$name\"'
```

(8)显示命令执行结果（这里是反引号，不是单引号）

```shell
echo `date`
```