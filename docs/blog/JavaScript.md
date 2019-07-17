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

### 2、js移动端rem自动化
```javascript
  var html = document.documentElement;
  var width = html.getBoundingClientRect().width;
  html.style.fontSize = width / 7.5 + "px";
  //1rem=100;
```