---
title: 🖋 ffmpeg将gif转为mp4
date: 2023-07-01 23:36:53
---

> *FFmpeg*是一套可以用来记录、转换数字音频、视频，并能将其转化为流的开源计算机程序。

<!--more-->

#### 1、安装ffmpeg

```shell
sudo apt install ffmpeg
```

#### 2、gif转为mp4等视频文件

```shell
ffmpeg -f gif -i *.gif *.mp4
```
