1、目前实现的是on方法和emit方法，支持一个事件的多个回掉函数

```js
function EventEmitter() {
    this.eventHandleQueue = [];
    this.on = function(eventName,fn){
        var existEvent = null;
        for(var i = 0; i < this.eventHandleQueue.length; i ++){
            if(this.eventHandleQueue[i].eventName == eventName){
                existEvent = this.eventHandleQueue[i];
                break;
            }
        }
        if(existEvent!=null){
            existEvent.handlers.push(fn);
        }else{
            var eventObj = {
                eventName:eventName,
                handlers:[],
                isOnceCall:false
            };
            eventObj.handlers.push(fn);
            this.eventHandleQueue.push(eventObj);
        }
    }

    this.emit = function(){
        var args = arguments;
        var eventName = args[0];
        var params = [].slice.call(args).slice(1,args.length);
        for(var i = 0; i < this.eventHandleQueue.length; i ++){
            if(this.eventHandleQueue[i].eventName == eventName){
                var handlers = this.eventHandleQueue[i].handlers;
                for(var j = 0; j < handlers.length; j ++){
                    handlers[j].apply(this,params);
                }
                break;
            }
        }
    }
}

function ddd (num1,num2){
    count = num1 + num2;
    console.log(count);
}

var e = new EventEmitter();var count = 0;e.on('test', ddd);e.emit('test', 1, 2);
```

