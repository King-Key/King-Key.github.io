---
title: hexo修改引用链接的样式
date: 2023-03-09 12:11:51
---
> 修改超链接的引用样式，先看一下效果

{% link Hexo的Butterfly魔改：网址卡片外挂标签,张洪Heo,https://blog.zhheo.com/p/ccaf9148.html %}

####  1、新建``` themes/butterfly/scripts/tag/link.js ```文件
```js
function link(args) {
    args = args.join(' ').split(',');
    let title = args[0];
    let sitename = args[1];
    let link = args[2];

    // 获取网页favicon
    let urlNoProtocol = link.replace(/^https?\:\/\//i, "");
    let imgUrl = "https://api.iowen.cn/favicon/" + urlNoProtocol + ".png";

    return `<a class="tag-Link" target="_blank" href="${link}">
    <div class="tag-link-tips">引用站外地址</div>
    <div class="tag-link-bottom">
        <div class="tag-link-left" style="background-image: url(${imgUrl});"></div>
        <div class="tag-link-right">
            <div class="tag-link-title">${title}</div>
            <div class="tag-link-sitename">${sitename}</div>
        </div>
        <i class="fa-solid fa-angle-right"></i>
    </div>
    </a>`
}

hexo.extend.tag.register('link',link, { ends: false })
```

####  2、在``` themes/butterfly/_config.yml```的```inject``` 中引入

```shell
inject:
  head:
    - <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/zhheo/JS-Heo@master/mainColor/heoMainColor.css">
    - <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/zhheo/JS-Heo@main/tag-link/tag-link.css">
  
    # - <link rel="stylesheet" href="/xxx.css">
  bottom:
    # - <script src="xxxx"></script>
    - <script src="/js/link.js"></script>
```

####  3、使用方法
markdown文件中使用
``` markdown
{% link 标题,名称,链接 %}
```

最后，重新``` hexo clean / hexo g / hexo s````就能看到效果了。