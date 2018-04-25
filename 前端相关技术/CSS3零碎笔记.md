## CSS3零碎笔记

设置元素内文字两端对齐问题

> text-align:justify：设置元素内的文字两端对齐，但是justify对最后一行无效，如果需要对最后一行生效，需要使用text-align-last:justify来排版。但是text-align-last:justify不是所有的浏览器都支持的。
>
> 兼容的方式使得文字两端对齐：由于text-align不会处理最后一行的内容，那么当最后一行内容没有满一行的时候，它不会处理，由此得不到两端对齐的效果，但是当我们强制在最后一行人工生成两行，然后把最后一行隐藏掉，这个时候我们想要的本来的最后一行也就成了倒数第一行，就能够实现两端对其了。
>
> 第一种方式：在后面加一个内联块状元素宽度为100%
>
> ```css
> .center{
>     text-align:justify;
> }
>
> span{
>     display:inline-block;
>     width:100%;
> }
>
> /*对应的html为：<div class = "center">你是我的眼睛<span></span></div>*/
> ```
>
> 第二种方式：使用你:after伪类
>
> ```html
> <style>
> 	.sd{
> 		width: 100px;text-align: justify;
>     }
>
>     .sd:after{
>           display: inline-block;
>           content: "";
>           width: 100%;
>           height: 0px;
>     }	
> </style>
> <p class="sd">飞机迪斯科逻辑结构范德萨范德萨分黑龙江幅度萨芬几点开始拉法兰的撒娇拉萨范德萨范德萨但是范德萨范</p>
> ```
>
> 