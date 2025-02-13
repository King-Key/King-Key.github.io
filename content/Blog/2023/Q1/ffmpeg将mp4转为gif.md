---
title: ffmpeg将mp4转为gif
date: 2022-08-07 18:07:11
---

> *FFmpeg*是一套可以用来记录、转换数字音频、视频，并能将其转化为流的开源计算机程序。

<!--more-->

#### 1、安装ffmpeg

```shell
sudo apt install ffmpeg
```

#### 2、mp4等视频文件转为gif

```shell
ffmpeg  -i 视频文件 1.gif
```

- -i ：指定文件