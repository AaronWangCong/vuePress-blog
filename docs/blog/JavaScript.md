# Javascript
::: tip
  `Javascript`是 Web 的编程语言。是前端的必备知识，微观到原生，大到各种框架的运用，所有现代的 HTML 页面都离不开它。
:::

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
### 1、H5 auto 标签
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