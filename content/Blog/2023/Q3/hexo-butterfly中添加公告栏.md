---
title: 🦋 hexo butterfly中添加公告栏
date: 2023-08-08 15:22:31
---
>博客美化

<!--more-->

# 参考
{% link Hexo中Buttefly主题公告栏设置与适配（十二）,偷掉月亮的阿硕,https://moonshuo.cn/posts/46856.html %}

{% link 首页置顶公告栏轮播,花猪,http://cnhuazhu.top/butterfly/2022/10/12/Hexo魔改/首页置顶公告栏轮播/ %}
# 修改

主要是```themes/butterfly/layout/includes/motice.pug```文件的修改

```shell
#notice.notice(onclick=`window.open('/butterfly/notice/','_self')`)
    i.notice-logo.fas.fa-bullhorn.fa-shake
    span=' '+_p('公告栏')
    #noticeList.swiper-container
        .swiper-wrapper
            if site.data.notice
                each i in site.data.notice
                    a(href=`${i.href}`,title="查看详情").li-style.swiper-slide=i.date+':'+i.msg
                    //- .li-style.swiper-slide=i.msg
    a(href="/notice/",title="查看全部公告").i.fas.fa-arrow-circle-right
.js-pjax
  script(src='https://unpkg.com/swiper/swiper-bundle.min.js' data-pjax='')
  script.
    var swiper = new Swiper ('#noticeList', {
      spaceBetween: 30,
      centeredSlides: true,
      direction: 'vertical', // 垂直切换选项
      loop: true, // 循环模式选项

      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
    })
```

