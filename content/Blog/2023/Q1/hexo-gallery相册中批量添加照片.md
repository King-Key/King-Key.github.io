---
title: hexo gallery相册中批量添加照片
date: 2023-02-20 00:37:10 
---

> hexo 可以使用gallery外挂创建相册，但手动添加太过麻烦，因此用shell脚本自动处理

#### 1、实现代码

```shell
#!/bin/sh 
#============ get the file name =========== 
Folder_A="./index" 

echo "---
title: 相册 
date: 2022-10-24 14:25:18
top_img:
cover:
categories: gallery
tags:
typora-root-url: ./index
---

{% gallery %}" > index.md


for file_a in ${Folder_A}/*
do 

temp_file=`basename $file_a` 

echo "![](./index/$temp_file)" >> index.md

echo $temp_file "写入完成"
done

echo "{% endgallery %}" >>index.md

```

这样只需要把所有的图片放到index文件夹下，执行文件即可实现在index.md中添加所有的图片链接
