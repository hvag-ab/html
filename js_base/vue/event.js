// 事件冒泡和事件捕获
// 事件流是描述从页面中接收事件的顺序【从内到外(冒泡)，从外到内(捕获)】。

// 事件冒泡：事件可以沿着包容层次一点点起泡到上层，也就是说，下层的DOM节点定义的事件处理函数，到了上层的节点如果还有和下层相同事件类型的事件处理函数，
// 那么上层的事件处理函数也会执行。例如， div 标签包含了 a ，如果这两个标签都有onclick事件的处理函数，那么执行的情况就是先执行标签 a 的onclick事件处理函数，再执行 div 的事件处理函数。
// 如果希望的事件处理函数执行完毕之后，不希望执行上层的 div 的onclick的事件处理函数了，那么就把cancelBubble设置为true即可。

// 事件捕获和事件冒泡刚好相反，它是事件从最不具体的节点(document)先接收到事件，然后再向下逐一捕获至（文档中嵌套层次最深的那个点【当前绑定事件的那个元素】）。

// 简单地说，事件冒泡和事件捕获都是一种事件传递的机制。这种机制可以使事件在不同级的元素间传递。事件冒泡是从事件触发的源节点，向父节点传递，直到到达最顶节点。而事件捕获则是从最顶节点，逐步向下传递，直到到达事件触发的源节点。

{/* <button v-on:click="warn('Form cannot be submitted yet.', $event)">
  Submit
</button>

// ...
methods: {
  warn: function (message, event) {
    // 现在我们可以访问原生事件对象
    if (event) {
      event.preventDefault()
    }
    alert(message)
  }
} */}


// <!-- 阻止单击事件继续传播 -->
// <a v-on:click.stop="doThis"></a>

// <!-- 提交事件不再重载页面 -->
// <form v-on:submit.prevent="onSubmit"></form>

// <!-- 修饰符可以串联 -->
// <a v-on:click.stop.prevent="doThat"></a>

// <!-- 只有修饰符 -->
// <form v-on:submit.prevent></form>

// <!-- 添加事件监听器时使用事件捕获模式 -->
// <!-- 即内部元素触发的事件先在此处理，然后才交由内部元素进行处理 -->
// <div v-on:click.capture="doThis">...</div>

// <!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
// <!-- 即事件不是从内部元素触发的 -->
// <div v-on:click.self="doThat">...</div>

// <!-- 点击事件将只会触发一次 -->
// <a v-on:click.once="doThis"></a>


// <!-- 滚动事件的默认行为 (即滚动行为) 将会立即触发 -->
// <!-- 而不会等待 `onScroll` 完成  -->
// <!-- 这其中包含 `event.preventDefault()` 的情况 -->
// <div v-on:scroll.passive="onScroll">...</div>


// <!-- 只有在 `key` 是 `Enter` 时调用 `vm.submit()` -->
// <input v-on:keyup.enter="submit">
// 你可以直接将 KeyboardEvent.key 暴露的任意有效按键名转换为 kebab-case 来作为修饰符。

// <input v-on:keyup.page-down="onPageDown"></input>

// .enter
// .tab
// .delete (捕获“删除”和“退格”键)
// .esc
// .space
// .up
// .down
// .left
// .right


// <button @click="clicked($event)" class="aa">切换页面</button>

// methods:{
//   clicked(e){
//       let event = e.target
//     console.log(event.value)
//       console.log(event.innerHTML)
//       console.log(event.getAttribute('class'))
//       console.log(event.parentNode.getAttribute('id'))
//       console.log(e.currentTarget)
          e.currentTarget.classList.add("show"); 动态给class类添加show  class="show"
e.currentTarget.classList.remove("show")
//   }
//   }

使用 addEventListener() 方法，事件监听 
resize 窗口变化的时候触发 格式如
methonds:{
    listenResize () {
      // 窗口大小变化的时候处理逻辑
    }
  },
  mounted () {
    window.addEventListener('resize', this.listenResize)
  },
  beforeDestroy () {
    window.removeEventListener("resize", this.listenResize);
  }
click 元素点击的时候触发

document.getElementById("myBtn").addEventListener("click", function(){ alert("Hello World!"); });

窗口关闭和更新监听
window.onload事件 设置页面加载时执行的动作，即进入页面的时候执行的动作。

window.onunload 已经从服务器上读到了需要加载的新的页面，在即将替换掉当前页面时调用，一般用于设置当离开页面以后执行的动作。

window.onbeforeunload 是正要去服务器读取新的页面时调用，此时还没开始读取，简单来说就是 在离开页面前的，一般用做提醒问你是不是要离开这个页面。

onunload和onbeforeunload都是在页面刷新和关闭前的动作，但是onbeforeunload是先于onunload的，并且 onunload是无法阻止页面的更新和关闭的。而 Onbeforeunload 可以做到

页面加载：onload
页面关闭：onbeforeunload →onunload
页面刷新：onbeforeunload →onunload→onload

data() {
  return {
    _beforeUnload_time:0, //保存界面刷新时先执行的时间
    _gap_time:0 //保存浏览器刷新或关闭时执行的时间
}

mounted () {
    window.addEventListener('beforeunload', e => this.beforeunloadHandler(e))
    window.addEventListener('unload', e => this.unloadHandler(e))
  },
  destroyed () {
    window.removeEventListener('beforeunload', e => this.beforeunloadHandler(e))
    window.removeEventListener('unload', e => this.unloadHandler(e))
  },
  methods: {
    beforeunloadHandler (e) {
      // debugger
      this._beforeUnload_time = new Date().getTime()
      console.log('this._beforeUnload_time：', this._beforeUnload_time)
      e = e || window.event
      if (e) {
        e.returnValue = '关闭提示'
      }
      // debugger
      return '关闭提示'
    },
    async unloadHandler () {
      console.log('this._beforeUnload_time2：', this._beforeUnload_time)
      this._gap_time = new Date().getTime() - this._beforeUnload_time
      console.log('this._gap_time：', this._gap_time)
      // 判断是窗口关闭还是刷新
      if (this._gap_time <= 5) {
        // debugger
        // 如果是登录状态，关闭窗口前，移除用户
        //await xxx().then(res=>{})
        }
      } else {
        // debugger
      }
    }
  }


