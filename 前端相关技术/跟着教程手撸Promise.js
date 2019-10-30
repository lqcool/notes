
/*Promise 存在3种状态 pending[等待态]、fulfilled[成功态]、rejected[失败态]*/

/*pending为promise的初始状态，promise的状态只能由pending->fulfilled 或者 pending->rejected*/

/*成功时，不可转为其他状态，且必须有一个不可改变的值（value）*/

/*失败时，不可转为其他状态，且必须有一个不可改变的原因（reason）*/

/*new Promise((resolve, reject)=>{resolve(value)}) resolve为成功，接收参数value，状态改变为fulfilled，不可再次改变。*/

/*new Promise((resolve, reject)=>{reject(reason)}) reject为失败，接收参数reason，状态改变为rejected，不可再次改变。*/

/*若是executor函数报错 直接执行reject();*/

class Promise {
	// 构造方法
	constructor(executor) {
		// promise的初始状态为pending状体【维护一个内部流转状态[state]】
		this.state = 'pending';

		// 维护一个成功的值
		this.value = undefined;

		// 维护一个失败的原因
		this.reason = undefined;

		// 存放成功后的成功回调函数的数组 因为可以一直then 可以添加很多的成功回调方法
		this.onResolvedCallbacks = [];

		// 存放失败后的失败回调函数的数组 因为可以一直then 可以添加很多的失败回调方法
		this.onRejectedCallbacks = []; 

		// 成功回调
		let resolve = (value) => {
			if(this.state === 'pending') { 
				// 如果当前状态时pending，调用resolve之后，那么状态流转为fulfilled
				this.state = 'fulfilled';
				// 存储成功的值
				this.value = value;
				// 一旦resolve执行，链式调用所有成功回调函数【遍历调用】
				this.onResolvedCallbacks.forEach(fn => fn());

			}
		}

		// 失败回调
		let reject  = (reason) => {
			if(this.state === 'pending') { 
				// 如果当前状态时pending，调用rejected之后，那么状态流转为rejected
				this.state = 'rejected';
				// 存储失败的原因
				this.reason = reason;
				// 一旦resolve执行，链式调用所有成功回调函数【遍历调用】
				this.onRejectedCallbacks.forEach(fn => fn());
			}
		}

		// promise立即执行,如果executor执行报错，直接执行reject
		try{
			executor(resolve, reject);
		} catch(excp) {
			reject(excp);
		}
	}

	// then方法 有两个参数 onFulfilled onRejected
	then(onFulfilled, onRejected) {
		// 因为要实现链式调用，因此需要返回一个promise，这个过度的promise需要做的将当前的结果传递到下一个then中，并返回自己实现链式调用
		let promise2 = new Promise((resolve, reject) => {

			// 状态为fulfilled，执行onFulfilled，传入成功的值
			if(this.state === 'fulfilled') {
				let x = onFulfilled(this.value);
				// resolvePromise函数，处理自己return的promise和默认promise2的关系
				resolvePromise(promise2, x, resolve, reject);
			};

			// 状态为rejected，执行onRejected，传入失败的原因
			if(this.state === 'rejected') {
				let x = onRejected(this.reason);
			}

			// 当状态state 为pending时
			if(this.state === 'pending') {
				// onFulfilled存入成功回调数组等待调用
				this.onResolvedCallbacks.push(() => {
					onFulfilled(this.value);
				});
				// onRejected存入失败回调数组等待调用
				this.onRejectedCallbacks.push(() => {
					onRejected(this.reason);
				});
			}
		});

		// 返回promise 完成链式调用
		return promise2; 
	}
}