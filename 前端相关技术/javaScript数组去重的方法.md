## javaScript数组去重的方法

参考：http://www.jb51.net/article/74347.htm

遍历数组法

```javascript
function deleteTheRepeat(ary){
    //声明一个新数组用于装这些不重复的元素
    var newAry = [];
    //遍历原始数组，通过indexOf判断当前元素中包含在newAry中，如果有，就跳过，否则就push进去。
    for(var i = 0; i < ary.length; i ++){
        if(newAry.indexOf(ary[i]) == -1){
            newAry.push(ary[i]);
        }
    }
    return newAry;
}
```

对象键值对法

```javascript
//该方法执行的速度比其他任何方法都快， 就是占用的内存大一些,实现思路：新建一js对象以及新数组，遍历传入数组时，判断值是否为js对象的键，不是的话给对象新增该键并放入新数组。注意 点： 判断是否为js对象键时，会自动对传入的键执行“toString()”，不同的键可能会被误认为一样；例如： a[1]、a["1"] 。解决上述问题还是得调用“indexOf”。
function 
```

数组下标判断法

```javascript
//实现思路：如果当前数组的第i项在当前数组中第一次出现的位置不是i，那么表示第i项是重复的，忽略掉。否则存入结果数组。
function deleteTheRepeat(ary){
    //结果数组
    var newAry = [ary[0]];
    for(var i = 1; i < ary.length; i ++){
        if(ary.indexOf(ary[i]) == i){
            newAry.push(ary[i]);
        }
    }
}
```

