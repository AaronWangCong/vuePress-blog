## 常用部分

### 1.标题
```javascript
  # ~ ######
  # h1
  ## h2
  ### h3
  #### h4
  ##### h5
  ###### h6
```

### 2.强调

*斜体*

_斜体_

~~删除线~~

***加粗+斜体***

**加粗**
```javascript
  *斜体*
  _斜体_
  **加粗**
  ~~删除线~~
  ***加粗+斜体***
```

### 3.代码块
`内联代码块`
```javascript
  `内联代码块`
```

### 4.表格
|     a     |        b        |      c       |
|:---------:|:--------------- | ------------:|
|   居中    | 左对齐           |       右对齐 |
| ========= | =============== | ============ |
```javascript
  |     a     |        b        |      c       |
  |:---------:|:--------------- | ------------:|
  |   居中    | 左对齐           |       右对齐 |
  | ========= | =============== | ============ |
```

### 5.链接
[百度1](http://www.baidu.com/"百度一下"){:target="_blank"}  

[百度2][2]{:target="_blank"}
[2]: http://www.baidu.com/  "百度二下"    

<xxx@outlook.com>
```javascript
  内链式
  [百度1](http://www.baidu.com/"百度一下"){:target="_blank"}  

  引用式
  [百度2][2]{:target="_blank"}
  [2]: http://www.baidu.com/  "百度二下" 
  
  邮箱链接
  <xxx@outlook.com>
```

### 5.图片
![name](../.vuepress/photo.jpg '描述')

![name][photo]
[photo]: ../.vuepress/photo.jpg '描述'

```javascript
  内链式
  ![name](./01.png '描述')

  引用式
  ![name][01]
  [01]: ./01.png '描述'
```

## 其他部分部分

### 1.序表
* one
* two
* three

1. one
2. two
3. three

* one
    * two
    * three

1. one
    2. two
    3. three
```javascript
  无序
  * one
  * two
  * three
  + - 可替代 *

  有序
  1. one
  2. two
  3. three

  序表嵌套
  * one
    * two
    * three

  1. one
      2. two
      3. three
```

### 2.清单
- [x] 选项一 
- [ ] 选项二
```javascript
  - [x] 选项一 
  - [ ] 选项二
```

### 3.引用
> aaaaaaaaa
>> bbbbbbbbb
>>> cccccccccc
```javascript
  > aaaaaaaaa
  >> bbbbbbbbb
  >>> cccccccccc
```

### 4.锚点
[公式标题锚点](#1)
```javascript
  [公式标题锚点](#1)
```

### 5.脚注
Markdown[^1]

[^1]: Markdown是一种纯文本标记语言。
```javascript
  Markdown[^1]
  [^1]: Markdown是一种纯文本标记语言。
```

### 6.github表情
:smile: :+1: :clap:
:gift_heart:  :dolls:

```javascript
  https://www.webfx.com/tools/emoji-cheat-sheet/
```

### 7.分隔符
***

---

```javascript
  ***
  ---
```

### 8.视频插入
[[图片上传失败...(image-49aefe-1542510791300)]](http://v.youku.com/v_show/id_XMjgzNzM0NTYxNg==.html?spm=a2htv.20009910.contentHolderUnit2.A&from=y1.3-tv-grid-1007-9910.86804.1-2#paction){:target="_blank"}

```javascript
  [[图片上传失败...(image-49aefe-1542510791300)]](http://v.youku.com/v_show/id_XMjgzNzM0NTYxNg==.html?spm=a2htv.20009910.contentHolderUnit2.A&from=y1.3-tv-grid-1007-9910.86804.1-2#paction){:target="_blank"}
```

### 9.内嵌CSS样式
<p style="color: #AD5D0F;font-size: 30px; font-family: '宋体';">内联样式</p>

```html
  <p style="color: #AD5D0F;font-size: 30px; font-family: '宋体';">内联样式</p>
```

<Vssue title="Vssue Demo" />
