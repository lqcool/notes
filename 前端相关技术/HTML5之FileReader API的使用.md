### HTML5之FileReader API的使用

**简介**

> FileReader 对象允许Web应用程序异步读取存储在用户计算机上面的文件（或者原始数据缓冲区）的内容，使用 [`File`](https://developer.mozilla.org/zh-CN/docs/Web/API/File) 或 [`Blob`](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob) 对象指定要读取的文件或数据。其中File对象可以是来自用户在一个[`input`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input)元素上选择文件后返回的[`FileList`](https://developer.mozilla.org/zh-CN/docs/Web/API/FileList)对象,也可以来自拖放操作生成的 [`DataTransfer`](https://developer.mozilla.org/zh-CN/docs/Web/API/DataTransfer)对象,还可以是来自在一个[`HTMLCanvasElement`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCanvasElement)上执行`mozGetAsFile()`方法后返回结果。

**FileReader的构造函数**

> FileReader，通过new FileReader()返回一个新构造的FileReader。

**FileReader的属性和描述**

| 属性                  | 访问性 | 说明                                                         |
| --------------------- | ------ | ------------------------------------------------------------ |
| FileReader.error      | 只读   | 表示在读取文件时发生的错误                                   |
| FileReader.readyState | 只读   | 表示FileReader状态的数字，取值如下：<br />常量名          值                 描述<br />EMPTY          0          还没有加载任何数据。<br />LOADING     1          数据正被加载<br />DONE           2          已完成全部的读取请求 |
| FileReader.result     | 只读   | 文件的内容，该属性仅仅在读取操作完成以后才有效，数据格式取决于使用哪种方法来启动读取操作。 |

**FileReader的事件处理**

> FileReader继承自EventTarget，因此所有下面的事件都可以通过addEventListener方法使用。

| 事件                   | 说明                                                         |
| ---------------------- | ------------------------------------------------------------ |
| FileReader.onbort      | 处理abort事件。该事件在文件读取操作被中断时触发。            |
| FileReader.onerror     | 处理error事件。该事件在读取操作发生错误时触发。              |
| FileReader.onload      | 处理load事件。该事件在读取操作完成时触发。                   |
| FileReader.onloadstart | 处理loadstart事件。该事件在读取操作开始时触发。              |
| FileReader.onloadend   | 处理loadend事件。该事件在读取操作结束时（要么成功，要么失败）触发。 |
| FileReader.onprogress  | 处理progress事件。该事件在读取[`Blob`](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob)时触发。 |

**FileReader的方法**

| 方法                            | 说明                                                         |
| ------------------------------- | ------------------------------------------------------------ |
| FileReader.abort()              | 终止读取操作。在返回的时候，readyState属性为DONE             |
| FileReader.readAsArrayBuffer()  | 开始读取指定的 [`Blob`](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob)中的内容, 一旦完成, result 属性中保存的将是被读取文件的 [`ArrayBuffer`](https://developer.mozilla.org/zh-CN/docs/Web/API/ArrayBuffer) 数据对象. |
| FileReader.readAsBinaryString() | 开始读取指定的[`Blob`](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob)中的内容。一旦完成，`result`属性中将包含所读取文件的原始二进制数据。 |
| FileReader.readAsDataURL()      | 开始读取指定的[`Blob`](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob)中的内容。一旦完成，`result`属性中将包含一个`data:` URL格式的字符串以表示所读取文件的内容。 |
| FileReader.readAsText()         | 开始读取指定的[`Blob`](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob)中的内容。一旦完成，`result`属性中将包含一个字符串以表示所读取的文件内容。 |

> readAsText：方法有两个参数，其中第二个参数是文本的编码格式，默认值为UTF-8。这个方法是将文件以文本方式读取，结果是文本文件中的内容。

**使用：示例（加载计算机中的图片展示到页面上）**

> ```html
> <div>
>     <div class="headImg">
>         <input type="file" style="visibility: hidden" id ="headFile" onchange="loadImage()"/>
>         <img onclick="trigerFileInput()" style="hidden;width:35%;height:85px" id="default" src="../img/timg.jpg"/>
>     </div>
> </div>
> <script>
>     //触发input[type="file"]的选择事件，打开图片选择窗口
>     function trigerFileInput(){
>       document.getElementById("headFile").click();
>     }
>     //加载图片
>    	function loadImage(){
>       var file = document.getElementById("headFile").files[0];
>       var filename = file.name;
>       if(/(\.png|\.jpg)$/.test(filename)){
>         var reader = new FileReader();
>         reader.onload = function(){
>           document.getElementById("default").src=this.result;
>         }
>         reader.readAsDataURL(file);
>       }
>       else{
>         alert("请选择正确的文件");
>       }
>   }
> </script>
> ```