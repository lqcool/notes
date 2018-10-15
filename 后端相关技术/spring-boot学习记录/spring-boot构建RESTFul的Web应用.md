### Spring Boot构建RESTful Web服务

Spring Boot为为企业应用程序构建RESTful Web服务提供了非常好的支持。要构建RESTful Web服务，需要将Spring Boot Starter Web依赖项添加到构建配置文件中。在build.gradle中为

```groovy
dependencies{
    compile('org.springframework.boot:spring-boot-starter-web')
}
```

### Rest控制器@RestController

`@RestController`注释用于定义RESTful Web服务，它提供JSON，XML和自定义响应。其语法如下所示 

```java
@RestController
public class ProductServiceController {
}
```

### 请求映射@RequestMapping

`@RequestMapping`注释用于定义访问REST端点的Request Url。可以定义Request方法来使用和生成对象。默认请求方法是:`GET`。

```java
@RequestMapping(value="/products")
public ResponseEntity<Object> getProducts(){}
```

### 请求主体@RequestBody

`@RequestBody`注释用于定义请求正文内容类型

```java
public ResponseEntity<Object> createProduct(@RequestBody Product product){
}
```

### 路径变量@PathVariable

`@PathVariable`批注用于定义自定义或动态请求URI。 请求URI中的Path变量定义为花括号`{}`，如下所示 

```java
public ResponseEntity<Object> updateProduct(@PathVariable("id") String id) {
}
```

### 请求参数@RequestParam

`@RequestParam`注释用于从请求URL读取请求参数。默认情况下，它是必需参数。还可以为请求参数设置默认值，如下所示 -

```java
public ResponseEntity<Object> getProduct(@RequestParam(value = "name", required = false, defaultValue = "honey") String name) {}
```



 