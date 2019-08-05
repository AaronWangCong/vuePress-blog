# Jquery
::: tip
  `jQuery` 是一个 JavaScript 库。
  `jQuery` 极大地简化了 JavaScript 编程。
  `jQuery` 语法是为 HTML 元素的选取编制的，可以对元素执行某些操作。
:::
## 文档就绪函数
  ### 1、执行顺序ready
  * 是为了防止文档在完全加载（就绪）之前运行 jQuery 代码。由jQuery的约定，所有的JavaScript代码最好都放在这里面。
  ```javascript
    $(document).ready(function(){
      // dom渲染之后执行
    });
  ```
## jQuery元素选择器和属性选择器
  ### 1、jQuery元素选择器
  ```javascript
    $("p") 选取 <p> 元素。

    $("p.intro") 选取所有 class="intro" 的 <p> 元素。

    $("p#demo") 选取所有 id="demo" 的 <p> 元素。
  ```
  ### 2、jQuery属性选择器
  ```javascript
    $("[href]") 选取所有带有 href 属性的元素。

    $("[href='#']") 选取所有带有 href 值等于 "#" 的元素。

    $("[href!='#']") 选取所有带有 href 值不等于 "#" 的元素。

    $("[href$='.jpg']") 选取所有 href 值以 ".jpg" 结尾的元素。
  ```
  ### 3、jQueryCSS选择器
  ```javascript
    $("p").css("background-color","red");
  ```
  ### 4、jquery选择器的参考手册
  * [如需完整的jquery选择器的参考手册](http://www.w3school.com.cn/jquery/jquery_ref_selectors.asp)

## jQuery事件函数
  * 事件处理程序指的是当 HTML 中发生某些事件时所调用的方法。
  ```html
    <html>
      <head>
        <script type="text/javascript" src="jquery.js"></script>
        <script type="text/javascript">
          $(document).ready(function(){
            $("button").click(function(){
              $("p").hide();
            });
          });
        </script>
      </head>
      
      <body>
        <h2>This is a heading</h2>
        <p>This is a paragraph.</p>
        <p>This is another paragraph.</p>
        <button>Click me</button>
      </body>
    </html>
  ```
  | Event 函数                       | 绑定函数至                                       |
  |:---------:|:---------------      |
  |   $(document).ready(function)    | 将函数绑定到文档的就绪事件（当文档完成加载时）      |
  |   $(selector).click(function)    | 触发或将函数绑定到被选元素的点击事件               |
  |   $(selector).dblclick(function) | 触发或将函数绑定到被选元素的双击事件               |
  |   $(selector).focus(function)    | 触发或将函数绑定到被选元素的获得焦点事件            |
  |   $(selector).mouseover(function)| 触发或将函数绑定到被选元素的鼠标悬停事件            |

  * [完整的jQuery事件](http://www.w3school.com.cn/jquery/jquery_ref_events.asp)
## jQuery效果
  ### 1、jQuery的显示及隐藏
  * 隐藏、显示、切换，滑动，淡入淡出，以及动画
  * 通过 jQuery，您可以使用 `hide()` 和 `show()` 方法来隐藏和显示 HTML 元素
  ```javascript
    $(selector).hide(speed,callback);
    $(selector).show(speed,callback);
    // 可选的 speed 参数规定隐藏/显示的速度，可以取以下值："slow"、"fast" 或毫秒。
  ```
  * 可选的 callback 参数是隐藏或显示完成后所执行的函数名称。
  ```html
    <html>
      <head>
        <script src="/jquery/jquery-1.11.1.min.js"></script>
        <script type="text/javascript">
        $(document).ready(function(){
          $("button#yincang").click(function(){
          $("p#id").hide(1000,function(){alert('bye')});
          });
        });
        $(document).ready(function(){
          $("button#xian").click(function(){
          $("p#id").show(function(){1000,alert('hello')});
          });
        });
        </script>
      </head>
      <body>
        <button type="button" id='xian'>显示</button>
        <button type="button" id='yincang'>隐藏</button>
        <p id="id">这是一个段落。</p>
        <p>这是另一个段落。</p>
      </body>
    </html>
  ```
  * 可以使用 toggle() 方法来切换 hide() 和 show() 方法。
  ```html
    <!DOCTYPE html>
    <html>
      <head>
        <script src="/jquery/jquery-1.11.1.min.js"></script>
        <script type="text/javascript">
        $(document).ready(function(){
          $("button").click(function(){
          $("p").toggle();
          });
        });
        </script>
      </head>
      <body>
        <button type="button">切换</button>
        <p>这是一个段落。</p>
        <p>这是另一个段落。</p>
      </body>
    </html>
  ```
  ### 2、jQuery淡入淡出方法
  * 通过 jQuery，您可以实现元素的淡入淡出效果。
  * jQuery 拥有下面四种 fade 方法：
    * fadeIn()
    * fadeOut()
    * fadeToggle()  -------*jQuery fadeToggle() 方法可以在 fadeIn() 与 fadeOut() 方法之间进行切换。*
    * fadeTo()      -------*fadeTo() 方法允许渐变的最终结果为给定的不透明度（值介于 0 与 1 之间，0为透明，1为不透明）。*
  ### 3、jQuery滑动方法
  * 通过 jQuery，您可以在元素上创建滑动效果。
  * jQuery 拥有以下滑动方法：
    * slideDown()
    * slideUp()
    * slideToggle()



# 既然大侠光临，不如留一手评论

<Vssue title="Vssue Demo" />