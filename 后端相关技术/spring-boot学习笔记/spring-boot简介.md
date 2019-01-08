### SpringBoot是什么？

首先Spring Boot不是一个框架，它是一种用来轻松创建具有最小或零配置的独立应用程序的方式。这是方法用来开发基于Spring的应用，但只需非常少的配置。它提供了默认的代码和注释配置，快速启动新的Spring项目而不需要太多时间。（Spring Boot是一个基于Java的开源框架，用于创建微服务。微服务(**Micro Service**)是一种允许开发人员独立开发和部署服务的体系结构。每个运行的服务都有自己的流程，这实现了轻量级模型以支持业务应用程序。）

### 动机

**Spring Boot**的主要动机是简化配置和部署[spring](http://www.yiibai.com/spring/)应用程序的过程。

Spring Boot得主要特点：

- 创建独立的**Spring**应用程序
- 直接嵌入Tomcat，Jetty或Undertow（无需部署WAR文件）
- 提供“初始”的POM文件内容，以简化Maven配置
- 尽可能时自动配置Spring
- 提供生产就绪的功能，如指标，健康检查和外部化配置
- 绝对无代码生成，也不需要XML配置

### SpringBoot的目标

- 为所有Spring开发提供一个基本的，更快，更广泛的入门体验。
- 开箱即用，但随着需求开始偏离默认值，快速启动。
- 提供大型项目(例如嵌入式服务器，安全性，度量，运行状况检查，外部化配置)常见的一系列非功能特性。
- 绝对没有代码生成以及不需要XML配置，完全避免XML配置。
- 为了避免定义更多的注释配置(它将一些现有的 **Spring Framework** 注释组合成一个简单的单一注释)
- 避免编写大量`import`语句。
- 提供一些默认值，以便在短时间内快速启动新项目。

### 使用SpringBoot的理由

- 简化基于Java的应用程序开发，单元测试和集成测试过程。
- 通过提供一些默认值来减少开发，单元测试和集成测试时间。
- 提高生产力。当使用默认值时，**Spring Boot**有自己的看法。如果不指定详细信息，它将使用其自己的默认配置。如果想要持久化，但是没有在POM文件中指定任何东西，那么**Spring Boot**会将Hibernate带有`HSQLDB`数据库的配置作为JPA提供者。
- 为大型项目(例如嵌入式服务器，安全性，度量，健康检查，外部化配置)提供许多非常常见的非功能特性/解决方案。

### SpringBoot应用程序

Spring Boot Application的入口点是包含`@SpringBootApplication`注释的类。该类具有运行SpringBoot应用程序的主要方法。`@SpringBootApplication`**注释包括了自动配置，组件扫描和Spring Boot配置**，如果将`@SpringBootApplication`批注添加到类中，则无需添加`@EnableAutoConfiguration`，`@ComponentScan`和`@SpringBootConfiguration`批注。`@SpringBootApplication`注释包括所有其他注释。

组件扫描：Spring Boot应用程序在应用程序初始化时扫描所有bean和包声明。需要为类文件添加`@ComponentScan`批注，以扫描项目中添加的组件。如下所示：

```java
import org.springframework.boot.SpringApplication;
import org.springframework.context.annotation.ComponentScan;

@ComponentScan
public class DemoApplication{
    public static void main(String [] args){
        SpringApplication.run(DemoApplication.class,args);
    }
}
```

### @value注解

@value注释用于读取Java代码中的环境或应用程序属性值。读取属性值的语法如下所示 ：

```java
@Value("${property_key_name}")
```

下面是读取java变量中的`spring.application.name`属性值的语法。

```java
@Value("${spring.application.name}")
```

如果在运行应用程序时未找到该属性，则Spring Boot将抛出非法参数异常，因为无法在值`${spring.application.name}`中解析占位符`'spring.application.name'`，这个时候可以使用默认值解决该问题。

```java
@Value("${property_key_name:default_value}")
@Value("${spring.application.name:demoservice}")
```

问题：通常上述的未找到该属性原因是由于存放于resources文件夹里面的application.properties文件没有编译，这个时候我们需要在`build.gradle`里面配置`sourceSet`可以指定哪些源文件（或文件夹下的源文件）要被编译

```java
sourceSets{
    main{
        java{
            //指定源码目录
            srcDir 'src/java'
        }
        resources{
            //资源目录
            srcDir 'src/resources'
        }
    }
    test{
    }
}
```



