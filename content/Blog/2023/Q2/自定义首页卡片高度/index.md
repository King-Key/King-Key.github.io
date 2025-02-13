---
title: 🦋 hexo butterfly自定义首页卡片高度
categories: hexo
tags:
  - hexo
  - butterfly主题美化
abbrlink: 252fec73
date: 2023-06-13 13:25:49
---

#### 修改代码

打开``` themes/butterfly/source/css/_page/homepage.styl ```文件
修改
```shell
  & > .recent-post-item
    @extend .cardHover
    display: flex
    flex-direction: row
    align-items: center
    overflow: hidden
    height: 15em  //原参数为18，修改为15即可，具体大小可自定义
```
#### 看看效果
| 18em效果                              | 15em效果                            |
| ------------------------------------- | ----------------------------------- |
| ![](./image-0.png) | ![](./image.png) |

