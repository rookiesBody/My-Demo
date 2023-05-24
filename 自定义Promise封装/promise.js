// executor 参数传入为一个 function
function Promise (executor) {
  // 添加属性
  this.promiseState = 'pending'
  this.promiseResult = null
  // 声明属性
  this.callbacks = []

  // 保存实例对象的 this 的值
  let that = this
  // resolve 函数
  function resolve (data) {
    // 判断状态，如果状态已经修改过，则不应该继续修改
    if (that.promiseState !== 'pending') return

    // 1. 修改对象的状态 (promiseState)
    that.promiseState = 'fulfilled'  // resolved 成功
    // 2. 设置对象结果值 (promiseResult)
    that.promiseResult = data
    // 调用成功的回调函数
    that.callbacks.forEach(item => {
      item.onResolved(data)
    })
  }

  // reject 函数
  function reject (data) {
    // 判断状态
    if (that.promiseState !== 'pending') return

    // 1. 修改对象的状态 (promiseState)
    that.promiseState = 'rejected'  // resolved 成功
    // 2. 设置对象结果值 (promiseResult)
    that.promiseResult = data

    // 执行失败的回调函数
    that.callbacks.forEach(item => {
      item.onRejected(data)
    })
  }

  try {   // 对此段执行的代码进行错误捕获
    // 同步调用 "执行器函数"
    // 调用执行器函数 传入的参数 为两个 函数
    executor(resolve, reject)
  } catch (e) {  // e 为你抛出的错误
    reject(e)
  }

}

// 添加 then 方法
Promise.prototype.then = function (onResolved, onRejected) {
  const that = this
  // 判断回调函数参数
  if (typeof onRejected !== 'function') {
    onRejected = reason => {
      throw reason
    }
  }
  if (typeof onResolved !== 'function') {
    onResolved = value => {
      value
    }
  }

  return new Promise((resolve, reject) => {
    // 封装函数
    function callback (type) {
      try {
        // 获取回调函数的执行结果
        let result = type(that.promiseResult)
        // 判断
        if (result instanceof Promise) {
          // 如果是 Promise 类型的对象
          result.then(v => {
            resolve(v)
          }, r => {
            reject(r)
          })
        } else {
          // 结果的对象状态为 成功
          resolve(result)
        }
      } catch (e) {
        reject(e)
      }
    }

    // 调用回调函数  通过判断 promiseState 的状态
    if (this.promiseState === 'fulfilled') {
      setTimeout(() => {
        callback(onResolved)
      })
    }
    if (this.promiseState === 'rejected') {
      callback(onRejected)
    }

    // 判断 pending 状态
    if (this.promiseState === 'pending') {
      // 保存回调函数
      this.callbacks.push({
        onResolved: function () {
          // console.log('success~');
          callback(onResolved)
        },
        onRejected: function () {
          callback(onRejected)
        }
      })
    }
  })
}

// 添加 catch 方法
Promise.prototype.catch = function (onRejected) {
  return this.then(undefined, onRejected)
}

// 添加 resolve 方法
Promise.resolve = function (value) {
  // 返回 promise 对象
  return new Promise((resolve, reject) => {
    if (value instanceof Promise) {
      value.then(v => {
        resolve(v)
      }, r => {
        reject(r)
      })
    } else {
      // 状态设置为成功
      resolve(value)
    }
  })
}

// 添加 reject 方法
Promise.reject = function (reason) {
  return new Promise((resolve, reject) => {
    reject(reason)
  })
}

// 添加 all 方法
Promise.all = function (promsies) {
  // 返回结果为 promise 的对象
  return new Promise((resolve, reject) => {
    // 声明变量
    let count = 0
    let arr = []
    // 遍历
    for (let i = 0; i < promsies.length; i++) {
      promsies[i].then(v => {
        // 此回调函数得知 对象的状态是成功
        // 每个 promise 对象都成功
        count++
        // 将当前 promise 对象成功的结果存到数组
        arr[i] = v
        // 判断
        if (count === promsies.length) {
          // 修改状态
          resolve(arr)
        }
      }, r => {
        reject(r)
      })
    }
  })
}

// 添加 race 方法
Promise.race = function (promises) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(v => {
        // 修改返回对象的状态为 成功
        resolve(v)
      }, r => {
        // 修改返回对象的状态为 失败
        reject(r)
      })
    }
  })
}