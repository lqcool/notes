## GULP

gulp能够做什么东西？（以前这些工作都是人工做的）

> - 检查JavaScript
> - 编译Sass（或Less之类的）文件
> - 合并JavaScript
> - 压缩并重命名合并后的JavaScript
> - 变更静态资源
> - 给静态资源添加md5
> - 合并雪碧图
> - 自动刷新浏览器

gulp的配置文件**gulpfile.js**（其实整个gulp的配置文件，基本上都是在做一些任务的配置，比如创建任务，监听任务等等）

> gulp只有5个方法
>
> - task：这个API用来创建任务，在命令行下可以输入gulp test来执行test的任务
> - run：这个API用来运行任务
> - watch：这个API用来监听任务
> - src：这个API设置需要处理的文件路径，可以是多个文件以数组的形式[main.scss,vender.scss]，也可以是正在表达式/*.scss
> - dest：这个API设置生成文件的路径，一个任务可以有多个生成路径，一个可以输出未压缩的版本，一个可以输出压缩后的版本