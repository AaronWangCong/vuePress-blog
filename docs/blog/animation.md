# 动画
::: tip
  好的动画效果能让客户使用网站时得到较好的使用体验，所以在交互的时候最少也需要用到简单的过渡效果。而产品展示及大型官方网站摄影网站都是需要使用动画效果，让网站活起来，让使用者眼前一亮。
:::
## 过渡效果
  ### 1、过渡效果的实现
  * 什么是过渡效果？
    * 过渡效果就是让一段交互有衔接的缓冲动画，能让人视觉跳转不至于那么生硬，用户体验更有美感，和舒适感。
  * 初体验 `transition`
    * transition-property *//规定设置过渡效果的 CSS 属性的名称。*
    * transition-duration *//规定完成过渡效果需要多少秒或毫秒。*
    * transition-timing-function *//规定速度效果的速度曲线。*
    * transition-delay  *//定义过渡效果何时开始。*
    ```css
      transition: property duration timing-function delay;

      transition: all .6s cubic-bezier(.215,.61,.355,1) 0s;
    ```
  ### 2、实现线性围绕效果
  * 先绘制一个div
  ```html
    <div class="wc"></div>
  ```
  * `wc` 的样式
  ```css
    .wc{
      width: 200px;
      height: 200px;
      background: rgb(54, 49, 49);
      transition: all .6s cubic-bezier(.215,.61,.355,1) 0s;
      position: relative;
      margin:  20px auto;
      &::before{
        color: inherit;
        position: absolute;
        display: block;
        visibility: hidden;
        width: 0;
        height: 0;
        content: ' ';
        border: 1px solid #07aefc;
        top: 1px;
        left: 50%;
        transition: height .1s linear .3s,width .1s linear .4s,visibility 0s .51s;
        border-bottom: 0;
        border-left: 0;
        margin: 10px;
        margin-left: 4px;
        z-index: 5;
      }
      &::after{
        color: inherit;
        position: absolute;
        display: block;
        visibility: hidden;
        width: 0;
        height: 0;
        content: ' ';
        border: 1px solid #07aefc;
        right: 1px;
        bottom: 0;
        transition: background-size .1s linear 0s,height .1s linear .1s,width .1s linear .2s,visibility 0s .3s;
        border-top: 0;
        border-right: 0;
        background-image: linear-gradient(#07aefc,#07aefc);
        background-repeat: no-repeat;
        background-position: 0 0;
        background-size: 0 1px;
        z-index: 5;
        margin: 10px;
      }
      &:hover::before {
        width: calc(52% - 20px);
        height: calc(100% - 23px);
        visibility: visible;
        transition: width .1s linear 0s,height .1s linear .1s;
      }
      &:hover::after {
        width: calc(100% - 24px);
        height: calc(100% - 22px);
        transition: visibility 0s .2s,width .1s linear .2s,height .1s linear .3s,background-size .1s linear .4s;
        background-size: 51% 1px;
        visibility: visible;
      }
    }
  ```
  * 显示效果

  ![name](../.vuepress/public/images/around.gif '描述')

# 既然大侠光临，不如留一手评论

<Vssue title="Vssue Demo" />