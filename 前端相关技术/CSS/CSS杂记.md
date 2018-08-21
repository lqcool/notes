1、文本转换text-transform：接收的值有uppercase|lowercase|capitalize|none|inherit，其中capitalize只对每个单词的首字母大写。

2、white-space影响用户代理对原文档中的空格、换行和tab字符的处理，默认为normal，也就是会将多个空格合成一个空格。

- `white-space:pre`如果将white-space设置为pre就如同使用pre标签一样，会保留空格、换行等。
- `white-space:normal`正常处理，也就是会忽略多余空格，将多个空格合成一个空格
- `white-space:nowrap`防止元素中的文本换行，除非使用了一个br元素
- `white-space:pre-wrap`该元素中的文本会保留空白符序列，但是会正常的换行，原文件中的行分隔符以及生成的行分隔符也会保留。
- `white-space:pre-line`会像正常文本中一样合并空白符序列，但保留换行符