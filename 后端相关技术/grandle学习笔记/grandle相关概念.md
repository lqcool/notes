grandle是基于Apache Ant和Apache Maven概念的项目自动化构建工具。它使用一种基于Groovy的特定领域语言(DSL)来声明项目设置，抛弃了基于XML的各种繁琐配置。 面向Java应用为主。

Gradle构建脚本文件用来处理两件事情：一个是项目和另一个的任务。简单地说，一个项目是由不同的任务组成。一个任务是指构建执行的一块工作。任务可能是编译一些类，创建一个`JAR`，产生的`Javadoc`或发布一些归档文件库。

### 任务 task

Groovy语言基本用法：<<语法是doLast的快捷指定方式，也可以不用

```groovy
//下面是定义一个任务，并且命名为ddd，该任务是打印hello world，使用grandle -q ddd执行下面的任务，会得到输出结果，写法如下
task ddd << {
    println "hello world"
}
//在grandle中使用groovy的api，如下，定义一个任务，该任务将字符转化为大写。使用gradle –q upper命令执行下面的任务
task upper << {
    String str = "hello world"
    println "Origin string " + str
    println "Upper case " + str.toUpperCase()
}
//下面任务4次打印，隐式参数$it，会得到结果 0 1 2 3
task count << {
    4.times{
        print "$it"
    }
}
//Groovy增加了很多有用的方法到标准的Java类。 例如，从Java API可迭代实现它遍历Iterable接口的元素的each() 方法。下面代码会每行输出一个字母，直到将liqiao输出完
task groovyJDKMethod << {
    String name = "liqiao"
    name.each(){
        println "${it}"
    }
}

```

### 任务依赖关系

可以声明依赖于其他任务的任务。如下所示：下面定义的任务taskX依赖于任务taskY

```groovy
task taskX(dependsOn: 'taskY') << {
    println "taskX"
}
task taskY << {
    println "taskY"
}
```

### 定位任务

如果要查找构建在文件中的定义任务，则必须使用标准的项目属性，这意味着每个任务都可以作为项目的属性，使用任务名称作为项目的属性。示例如下所示：

