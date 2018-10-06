`Gradle`遵循一些特殊语法来定义依赖关系。 以下脚本定义了两个依赖项，一个是`Hibernate core 3.6.7`，第二个是`Junit 4.0`和更高版本。如下面的代码所示，可在`build.gradle`文件中使用此代码。

```groovy
apply plugin: 'java'

repositories{
    mavenCentral()
}

dependencies {
    compile group:'org.hibernate',name:'h  ibernate-core',version:'3.6.7.Final'
    testCompile group:'junit',name:'junit',version:'4'
}
```

**依赖关系配置** ：依赖关系配置只是定义了一组依赖关系。 您可以使用此功能声明从Web下载外部依赖关系。这定义了以下不同的标准配置。

- 编译-编译项目的生产源所需的依赖关系。
- 运行时-运行时生产类所需的依赖关系。 默认情况下，还包括编译时依赖项。
- 测试编译 - 编译项目测试源所需的依赖项。 默认情况下，它包括编译的产生的类和编译时的依赖。
- 测试运行时 - 运行测试所需的依赖关系。 默认情况下，它包括运行时和测试编译依赖项。

**外部依赖：** 外部依赖是一种依赖。 这是对当前构建之外构建的一些文件的依赖，并且存储在某种类型的存储库中，例如：[Maven](http://www.yiibai.com/maven/) central，corporate Maven或lvy repository或本地文件系统中的目录。如下定义外部依赖：

```groovy
dependencies{
    compile group:'org.hibernate',name:'hibernate-core',version:'3.6.7.Final'
}
```

**存储库：** 在添加外部依赖关系时， Gradle在存储库中查找它们。 存储库只是文件的集合，按分组，名称和版本来组织构造。 默认情况下，Gradle不定义任何存储库。 我们必须至少明确地定义一个存储库。 下面的代码片段定义了如何定义 `maven` 仓库。 在`build.gradle`文件中使用此代码。

```groovy
repositories{
    mavenCentral()
}
```

下面的代码是定义远程`maven`。 在`build.gradle`文件中可使用下面代码。

```groovy
repositories{
    maven{
        url:'http://repo.mycompany.com/maven2'
    }
}
```

**发布文件：** 依赖关系配置也用于发布文件。 这些已发布的文件称为工件。 通常，我们使用插件来定义工件。 但是需要告诉`Gradle`在哪里发布文件。可以通过将存储库附加到上传存档任务来实现此目的。 请查看以下用于发布`Maven`存储库的语法。 执行时，`Gradle`将根据项目需求生成并上传`Pom.xml`。 在`build.gradle`文件中使用此代码。

```groovy
apply plugin:'maven'
uploadArchives{
    repositories{
        mavenDeployer{
            repository(url:"file://localhost/tmp/myRepo/")
        }
    }
}
```



