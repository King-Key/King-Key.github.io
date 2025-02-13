---
title: linux中一些好用的命令
date: 2023-03-14 19:03:32
---

#### 1、创建软连接```ln```

```shell
ln -s 源文件 目标文件
```

#### 2、同步文件夹```rsync```
```shell
rsync -avz 源目录 目标目录
```
- a 表示以递归模式进行传输
- v 表示显示详细信息 
- z 表示在传输时进行压缩

#### 3、快捷命令```alias```
> 需要在```.bashrc```或者```.zshrc```中添加使用
```shell
alias 自定义命令 = "需要自动化操作的命令1 && 需要自动化操作的命令2"
```
比如
```shell
alias hd="cd hexo && hexo clean && hexo g && hexo d"
```
这样就能直接一次性执行三条命令进行部署