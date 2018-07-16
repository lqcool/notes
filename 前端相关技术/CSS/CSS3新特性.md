### CSS3新特性

CSS3选择器

- element1~element2：选择前面有element1元素的每个element2元素 
- [attribute^=value]：选择某元素attribute属性是以value开头的 
- [attribute$=value]：选择某元素attribute属性是以value结尾的 
- [attribute*=value]：选择某元素attribute属性包含value字符串的 
- E:first-child：匹配的是某父元素的第一个子元素，可以说是结构上的第一个子元素 
- E:first-of-type：匹配的是某父元素下相同类型子元素中的第一个（这里不再限制是第一个子元素了，只要是该类型元素的第一个就行了 ）
- E:last-of-type: 匹配的是某父元素下相同类型子元素中的最后一个（这里不再限制是最后一个子元素了，只要是该类型元素的最后一个就行了 ）
- E:only-of-type: 选择属于其父元素唯一的E元素的每个E元素 