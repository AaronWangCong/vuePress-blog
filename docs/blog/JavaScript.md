# Javascript
::: tip
  `Javascript`是 Web 的编程语言。是前端的必备知识，微观到原生，大到各种框架的运用，所有现代的 HTML 页面都离不开它。
:::
## JS等待DOM渲染
  ### 1、readyState判断dom是否加载完成
  ```javascript
    /**
    * 监听dom是否加载完成
    * loading  仍在加载。
    * interactive  文档已被解析，"正在加载"状态结束，但是诸如图像，样式表和框架之类的子资源仍在加载。
    * complete 文档和所有子资源已完成加载。表示 load 状态的事件即将被触发。
    */
    function onReady(fn){
      var readyState = document.readyState;
      if(readyState === 'interactive' || readyState === 'complete') {
      fn()
    }else{
        window.addEventListener("DOMContentLoaded",fn);
      }
    }

    onReady(function(){
      alert('DOM fully loaded and parsed ')
    })
  ```
  ### 2、onload判断dom加载完成
  ```javascript
    window.onload = function(){
      alert('页面加载完成后，我被加载出来了！')
    };
  ```
  ### 3、ready判断dom加载完成
  ```javascript
    document.querySelector(document).ready(function(){
      alert("Hello")
    })
  ```

## 移动端及PC端
  ### 1、js判断环境为移动端或pc端
  ```javascript
    //  根据设备识别
    var userAgentInfo = navigator.userAgent;  
    var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");  
    var flag = true; 
    for (var v = 0; v < Agents.length; v++) {  
        if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }  
    }
    //  根据屏幕分辨率识别
    var screenWidth = document.body.clientWidth
    if(screenWidth < 760) {
      this.$router.push({path:'/m'})
    }
  ```

  ### 2、js判断是否为微信端
  ```javascript
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
      //在微信中打开
    }else {
    }
  ```

  ### 3、js移动端rem自动化
  ```javascript
    var html = document.documentElement;
    var width = html.getBoundingClientRect().width;
    html.style.fontSize = width / 7.5 + "px";
    //1rem=100;
  ```
## JS的数据处理
  ### 1、filter过滤器
  * 简单讲filter就是一个数组过滤器，参数接收一个函数，数组的每一项经过函数过滤，返回一个符合过滤条件的新数组
  * 函数接收三个参数：
      * item （当前遍历的数组项）
      * i （当前项索引）
      * arr （调用filter数组本身）

  **数组过滤**
  ```javascript
    let arr = [1, 3, 5, 8]
    let arrFilter = arr.filter(ele => ele > 4)
    console.log(arrFilter) // [5, 8]
  ```
  **对象过滤**
  ```javascript
    let arrObj = [
      { name: 'aa', age: 13 },
      { name: 'bb', age: 23 },
      { name: 'cc', age: 18 }, 
      { name: 'dd', age: 11 }, 
      { name: 'ee', age: 28 }
    ]
    let arrObjFilter = arrObj.filter(ele => ele.age > 18)
    console.log(arrObjFilter) // [{name: 'bb', age: 23}, {name: 'ee', age: 28}]
  ```
  **数组去重**
  ```javascript
    //  过时用法
    let arr = [1, 2, 3, 2, 3, 4]
    let arrFilter = arr.filter((ele, index, arr) => {
      return arr.indexOf(ele) === index
    })
    console.log(arrFIlter)
    //  ES6用法
    let arr = [1, 2, 3, 2, 3, 4]
    let arrFilter = [...new Set(arr)]
    console.log(arrFilter)
  ```
  **数组中的空字符去除**
  ```javascript
    let arr = ['1', '2', '3', '', null, undefined, '  ', '4']
    let arrFilter = arr.filter((ele, index, arr) => {
      return ele && ele.trim()
    })
    console.log(arrFIlter)
  ```
  **高级用法**

  结合map使用可以先过滤出符合条件的对象然后去除某些不需要的字段,比如:
  ```javascript
    // 需求: 年龄大于18的姓名
    let arrObj = [
      { name: 'aa', age: 13}, 
      { name: 'bb', age: 23}, 
      { name: 'cc', age: 18}, 
      { name: 'dd', age: 11}, 
      { name: 'ee', age: 28}
    ]
    let arrObjFilter = arrObj.filter(ele => ele.age > 18).map(ele => {
      return ele.name
    })
    console.log(arrObjFilter) // ['bb', 'ee']
  ```

  ### 2、循环遍历对象、数组
  ```javascript
    // forEach  无法结束无法跳珠循环
    const arr = ['red', 'green', 'blue'];
    arr.forEach(function (element, index) {
      console.log(element); // red green blue
      console.log(index); // 0 1 2
    });

    //  for...of
    //数组默认的遍历器对象
    for(let x of arr[Symbol.iterator]()){
      console.log(x);
    }
    // for of调用arr.keys()返回的遍历对象
    for(let x of arr.keys()){
      console.log(x);
    }
    // for of调用arr.entries()返回的遍历对象
    for(let [index,value] of arr.entries()){
      console.log(index,value);
    }
    // arr.entries()返回新的遍历对象，它包含了数组每个索引的键值对 
    // arr.keys()返回新的遍历对象，它包含数组中每个索引的键 

    //  对象遍历方法
    //  获取键值
    for (var key of Object.keys(someObject)) {
      console.log(key + ': ' + someObject[key]);
    }

    //  map方法
    const arr = [
      { name: 'aa', age: 18, address: '北京' },
      { name: 'bb', age: 20, address: '上海' },
      { name: 'cc', age: 21, address: '天津' },
    ]
    const mapArr = arr.map((val, index) => {
      return val.age
    })
    console.log(arr) //还是和原来的一毛一样
    console.log(mapArr) //映射出一个新的数组，通过return返回
  ```

  ### 3、js保留小数位数
  ```javascript
    // 1、toFixed()方法 四舍五入  需注意，保留两位小数，将数值类型的数据改变成了字符串类型
    var num = 2.446242342;  
    num = num.toFixed(2); 
    console.log(num); //2.45
    console.log(typeof num); // string

    // 2、Math.floor()，不四舍五入 ，向下取整 不改变数据类型
    num = Math.floor(num * 100) / 100;
    console.log(num); //2.44
    console.log(typeof num); // number

    // 3、字符串匹配  注意，先将数据转换为字符串，最后再转为数值类型
    num = Number(num.toString().match(/^\d+(?:\.\d{0,2})?/));
    console.log(num); //2.44
    console.log(typeof num); // number
  ```
## 网页的视频、音频播放
  ### 1、H5auto标签
  * 不具体说,vue封装组件,有空再详写,此组件还包括`cavans`律动效果
  ```vue
    <template>
      <div>
        <div class="audio-wrap" :class="isCloseAuto ? '' : 'autoPlay'">
          <audio id="audio" class="audio" controls src="/video/Sugar.mp3" preload="auto" loop="loop"></audio>
          
          <i class="iconfont icon-yinle" @click="closeAuto()"></i>
        </div>
        <div class="canvas-box" :class="isCanvasBox?'':'closeCanvas'">
          <canvas v-show="isCanvasBox" id='canvas' width="575" height="350"></canvas>
          <span class="canvas-box-close" @click="isCanvasBox = !isCanvasBox">{{ isCanvasBox?'close':'open' }}</span>
        </div>
      </div>
    </template>
    <script>
      export default {
        name: '',
        components: {
        },
        props:{
        },
        data() {
          return {
            isCloseAuto: false,
            isCanvasBox: true
          }
        },
        computed: {
        },
        created() {
        },
        mounted() {
          window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext;
          var ua = window.navigator.userAgent.toLowerCase();
          if (ua.match(/MicroMessenger/i) == "micromessenger") {
            //在微信中打开
          }else {
          }
          this.autoPlayMusic()
          this.initCavans()
        },
        methods: {
          autoPlayMusic() {
            // 自动播放音乐效果，解决浏览器或者APP自动播放问题
            document.body.addEventListener('touchstart', this.musicInBrowserHandler);
            // 自动播放音乐效果，解决微信自动播放问题
            document.addEventListener('DOMContentLoaded', this.musicInWeixinHandler);
          },
          musicPlay(isPlay) {
            var audio = document.getElementById('audio');
            
            if (isPlay && audio.paused) {
                audio.play();
            }
            if (!isPlay && !audio.paused) {
                audio.pause();
            }
          },
          musicInBrowserHandler() {
            this.musicPlay(true);
            document.body.removeEventListener('touchstart', this.musicInBrowserHandler);
          },
          musicInWeixinHandler() {
            let that = this
            that.musicPlay(true);
            document.addEventListener("WeixinJSBridgeReady", function () {
                that.musicPlay(true);
            }, false);
            document.removeEventListener('DOMContentLoaded', that.musicInWeixinHandler);
          },
          closeAuto() {
            this.isCloseAuto = !this.isCloseAuto
            this.musicPlay(this.isCloseAuto);
            // 关闭音乐
            // document.getElementById("audio").muted = this.isCloseAuto;
          },
          initCavans() {
            var audio = document.getElementById('audio');
            var ctx = new AudioContext();
            var analyser = ctx.createAnalyser();
            var audioSrc = ctx.createMediaElementSource(audio);
            // we have to connect the MediaElementSource with the analyser 
            audioSrc.connect(analyser);
            analyser.connect(ctx.destination);
            // we could configure the analyser: e.g. analyser.fftSize (for further infos read the spec)
            // analyser.fftSize = 64;
            // frequencyBinCount tells you how many values you'll receive from the analyser
            var frequencyData = new Uint8Array(analyser.frequencyBinCount);

            // we're ready to receive some data!
            var canvas = document.getElementById('canvas'),
                cwidth = canvas.width,
                cheight = canvas.height - 2,
                meterWidth = 10, //width of the meters in the spectrum
                gap = 2, //gap between meters
                capHeight = 2,
                capStyle = '#fff',
                meterNum = 800 / (10 + 2), //count of the meters
                capYPositionArray = []; ////store the vertical position of hte caps for the preivous frame
            ctx = canvas.getContext('2d');
            var gradient = ctx.createLinearGradient(0, 0, 0, 300);
            gradient.addColorStop(1, '#0f0');
            gradient.addColorStop(0.5, '#ff0');
            gradient.addColorStop(0, '#f00');
            // loop
            function renderFrame() {
                var array = new Uint8Array(analyser.frequencyBinCount);
                analyser.getByteFrequencyData(array);
                var step = Math.round(array.length / meterNum); //sample limited data from the total array
                ctx.clearRect(0, 0, cwidth, cheight);
                for (var i = 0; i < meterNum; i++) {
                    var value = array[i * step];
                    if (capYPositionArray.length < Math.round(meterNum)) {
                        capYPositionArray.push(value);
                    };
                    ctx.fillStyle = capStyle;
                    //draw the cap, with transition effect
                    if (value < capYPositionArray[i]) {
                        ctx.fillRect(i * 12, cheight - (--capYPositionArray[i]), meterWidth, capHeight);
                    } else {
                        ctx.fillRect(i * 12, cheight - value, meterWidth, capHeight);
                        capYPositionArray[i] = value;
                    };
                    ctx.fillStyle = gradient; //set the filllStyle to gradient for a better look
                    ctx.fillRect(i * 12 /*meterWidth+gap*/ , cheight - value + capHeight, meterWidth, cheight); //the meter
                }
                requestAnimationFrame(renderFrame);
            }
            renderFrame();
          }
        }
      }
    </script>
  ```
## js实现倒计时
  ### 1、业务准备
  * 为保证时间的正确性需要后台返回服务器当前时间，及活动结束时间。
  * 倒计时就是活动结束时间减去服务器当前时间
  * 进行倒计时运算
  ### 2、业务案例
  * 需要实现欠费通知提醒倒计时
  * 欠费时间大于7天不显示
  * 欠费时间大于0小于7天打开浏览器显示一次并且可关闭
  * 欠费时间等于0或小于0通知一直存在并且无法关闭
  ### 3、业务代码
  * 结束时间-当前时间进行倒计时
  * 用浏览器进行缓存，7天内进行一次性显示，如果有就不弹出，没有就弹出并缓存，关闭浏览器清空。
  * 组件代码
  ```vue
    <template>
      <div class="expireInfo-wrap">
        <el-dialog title="账户欠费通知" :visible.sync="dialogVisible" width="600px" :close-on-click-modal="isClose" :show-close="isClose">
          <p class="expireInfo-wrap-tips">{{ extraMap.content }}</p>
          <p class="expireInfo-wrap-title">服务器停机倒计时：</p>
          <p class="expireInfo-wrap-time"><span>{{ isDays }}</span> 天 <span>{{ isHours }}</span> 小时 <span>{{ isMinutes }}</span> 分钟 <span>{{ isSeconds }}</span> 秒</p>
          <p class="expireInfo-wrap-title" v-if="isTimeOver">您的服务器已欠费停机，请尽快续费使用！</p>
        </el-dialog>
      </div>
    </template>
    <script>
      import { mapState } from 'vuex'
      export default {
        name: '',
        components: {
        },
        props:{
        },
        data() {
          return {
            dialogVisible: false,
            isClose: true,
            isTimeOver: false,
            isDays: '00',
            isHours: '00',
            isMinutes: '00',
            isSeconds: '00'
          }
        },
        computed: {
          ...mapState({
            "extraMap": state => state.companyInfo.extraMap
          }),
        },
        created() {
          let that = this
          setTimeout(function () {
            if(!that.extraMap.currentTime || !that.extraMap.expire) {
              return;
            }
            let endtime_ms = Date.parse(new Date(that.extraMap.expire.replace(/-/g, "/")));   // 结束时间
            let currentTime = that.extraMap.currentTime // 服务器当前时间
            let difference = endtime_ms - currentTime
            that.startTimer(difference)
          }, 1000);
        },
        mounted() {
        },
        methods: {
          startTimer(difference) {
            let that = this
            // 大于7天不显示
            if(difference > 604800000) {
              that.dialogVisible = false
              that.isClose = true
              return;
            }
            // 时间消耗完成后为0,切不能关闭弹窗
            if(difference <= 0) {
              difference = 0
              that.isClose = false
              document.cookie = "popped = ";
              console.log("111", that.getCookie('popped'))
            }
            // 能关闭弹窗
            if(difference <= 604800000 && difference > 0) {
              that.isClose = true
            }
            console.log("that.getCookie('popped')", that.getCookie('popped'))
            if (that.getCookie('popped') == ''){ //cookie 中没有 popped 则赋给他一个值（此时弹框显示）
              document.cookie = "popped = yes";
              that.dialogVisible = true
            }else{
              that.dialogVisible = false //若cookie 中已经有 popped 值，则弹框再不会显示
            }

            let inteval = setInterval(function(){
              difference -= 1000
              if(difference <= 0) {
                clearInterval(inteval);
                that.isClose = false
                difference = 0
              }
              that.getTime(difference)
            },1000)
          },
          getTime(difference) {
            if(difference<=0){
              this.isTimeOver = true
              return;
            }
            this.isTimeOver = false
            var days = parseInt(difference / 1000 / 60 / 60 / 24, 10); //计算剩余的天数
            var hours = parseInt(difference / 1000 / 60 / 60 % 24, 10); //计算剩余的小时
            var minutes = parseInt(difference / 1000 / 60 % 60, 10); //计算剩余的分钟
            var seconds = parseInt(difference / 1000 % 60, 10); //计算剩余的秒数

            days = (new String(days).length) == 1 ? '0' + days : days;
            hours = (new String(hours).length) == 1 ? '0' + hours : hours;

            minutes = (new String(minutes).length) == 1 ? '0' + minutes : minutes;
            seconds = (new String(seconds).length) == 1 ? '0' + seconds : seconds;
            
            this.isDays = days
            this.isHours = hours
            this.isMinutes = minutes
            this.isSeconds = seconds
          },
          getCookie(Name) { //cookie
            var search = Name + "=";
            var returnValue = "";
            if (document.cookie.length > 0) {
              var offset = document.cookie.indexOf(search);
              if (offset !== -1) {
                offset += search.length;
                var end = document.cookie.indexOf(";", offset);
                if (end == -1){
                  end = document.cookie.length;
                }
                returnValue = decodeURIComponent(document.cookie.substring(offset, end));
              }
            }
            return returnValue;
          }
        }
      }
    </script>
    <style lang="scss">
    .expireInfo-wrap{
      .el-dialog__header{
        background-color: rgb(248, 17, 17);
        text-align: center;
      }
      .el-dialog__body{
        text-align: center;
        padding: 40px 20px !important;
        .expireInfo-wrap-tips{
          padding-bottom: 20px;
        }
        .expireInfo-wrap-title{
          color: rgb(248, 17, 17);
        }
        .expireInfo-wrap-time{
          color: rgb(248, 17, 17);
          margin-bottom: 20px;
          span{
            font-size: 30px;
            font-weight: bold;
          }
        }
      }
    }
    </style>
  ```
## js监听滚动及回到底部
  ### 1、滚动监听
  ```javascript
    let bodyScrollHeight = document.body.scrollHeight || document.documentElement.scrollHeight;
    let windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
    window.addEventListener('scroll', function () {
      let scrolltop = document.documentElement.scrollTop || document.body.scrollTop;
      if (scrolltop + windowHeight === bodyScrollHeight) {
        console.log('触底了')
      }
      console.log('windowHeight', scrolltop, bodyScrollHeight, windowHeight)
    })
  ```
  ### 2、回到网页底部
  ```javascript
    window.scrollTo(0, document.documentElement.scrollHeight - document.documentElement.clientHeight);
    // scrollTo(xpos,ypos)
  ```
## JS监听Dom元素是否改变
::: tip
  完整使用请直接查看使用例子
:::
  ### 1、observer概述
  * `Mutation Observer API` 用来监视 `DOM` 变动。`DOM` 的任何变动，比如节点的增减、属性的变动、文本内容的变动，这个 `API` 都可以得到通知。
  * Mutation Observer 有以下特点。
    * 它等待所有脚本任务完成后，才会运行（即异步触发方式）。
    * 它把 `DOM` 变动记录封装成一个数组进行处理，而不是一条条个别处理 `DOM` 变动。
    * 它既可以观察 `DOM` 的所有类型变动，也可以指定只观察某一类变动。
  ### 2、observer构造函数
  * 使用时，首先使用 `MutationObserver` 构造函数，新建一个观察器实例，同时指定这个实例的回调函数。
  ```javascript
    var observer = new MutationObserver(callback);
  ```
  * 上面代码中的回调函数，会在每次 `DOM` 变动后调用。该回调函数接受两个参数，第一个是变动数组，第二个是观察器实例，下面是一个例子。
  ```javascript
    var observer = new MutationObserver(function (mutations, observer) {
      mutations.forEach(function(mutation) {
        console.log(mutation);
      });
    });
  ```
  ### 3、MutationObserver的实例方法
  * `observe` 方法用来启动监听，它接受两个参数。
    * 第一个参数：所要观察的 `DOM` 节点
    * 第二个参数：一个配置对象，指定所要观察的特定变动
    ```javascript
      var article = document.querySelector('article');
      var  options = {
        'childList': true,
        'attributes':true
      } ;
      observer.observe(article, options);
    ```
    * 观察器所能观察的 `DOM` 变动类型（即上面代码的 `options` 对象），有以下几种。
    ```javascript
      var  options = {
        childList: true,  /* 子节点的变动（指新增，删除或者更改）。*/
        attributes: true, /* 属性的变动。*/
        characterData: true, /*节点内容或节点文本的变动。*/
        subtree: true,  /*布尔值，表示是否将该观察器应用于该节点的所有后代节点。*/
        attributeOldValue: true,  /* 布尔值，表示观察attributes变动时，是否需要记录变动前的属性*/
        characterDataOldValue: true, /* 布尔值，表示观察characterData变动时，是否需要记录变动前的值。*/
        attributeFilter:['class','src'] /*数组，表示需要观察的特定属性（比如['class','src']）。*/
      } ;
    ```
    * 对一个节点添加观察器，就像使用 `addEventListener` 方法一样，多次添加同一个观察器是无效的，回调函数依然只会触发一次。但是，如果指定不同的 `options` 对象，就会被当作两个不同的观察器。
  ### 4、observer使用例子
  * 下面的例子是观察新增的子节点。
  ```javascript
    var insertedNodes = [];
    var observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        for (var i = 0; i < mutation.addedNodes.length; i++)
          insertedNodes.push(mutation.addedNodes[i]);
      })
    });
    observer.observe(document, { childList: true });
    console.log(insertedNodes);
  ```
  ### 5、observer扩展
  * `disconnect` 方法用来停止观察。调用该方法后，DOM 再发生变动，也不会触发观察器。
  ```javascript
    observer.disconnect();
  ```
  * ``takeRecords`` 方法用来清除变动记录，即不再处理未处理的变动。该方法返回变动记录的数组。
  ```javascript
    observer.takeRecords();
  ```
# 既然大侠光临，不如留一手评论

<Vssue title="Vssue Demo" />