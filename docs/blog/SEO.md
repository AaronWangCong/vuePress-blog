## SEO

### 1、百度推送
```javascript
  // 百度自动推送
  (function(){
    let bp = document.createElement('script');
    bp.src = 'http://push.zhanzhang.baidu.com/push.js';
    let s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(bp, s);
  })();
```