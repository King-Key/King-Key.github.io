---
title: ROS安装
date: 2022-07-30 10:51:06
---

> 机器人学习，ROS安装

<!--more-->

1、ROS安装

```shell
sudo apt install curl gnupg2 lsb-release
curl http://repo.ros2.org/repos.key | sudo apt-key add - 
sudo sh -c 'echo "deb http://packages.ros.org/ros2/ubuntu `lsb_release -cs` main" > /etc/apt/sources.list.d/ros2-latest.list'
sudo apt update
sudo apt install ros-noetic-desktop-full
```

2、初始化ROS

```shell
sudo rosdep init
rosdep update
```

- 问题1： sudo: rosdep：找不到命令

安装

```shell
sudo apt install python3-rosdep2
```

或者

```shell
sudo apt install python-rosdep2
```

- 问题2：

```shell
ERROR: cannot download default sources list from:
https://raw.githubusercontent.com/ros/rosdistro/master/rosdep/sources.list.d/20-default.list
Website may be down.
```

解决方案1：

```shell
sudo gedit /etc/hosts

199.232.28.133 raw.githubusercontent.com
151.101.228.133 raw.github.com
```

解决方案2：直接下载本地文件，并更改相应文件。

> 文件链接：链接: https://pan.baidu.com/s/1buhh86hURn-0K6llS7Ypfw  提取码: 2o8b

下载解压并移动到 /etc/ros/ 目录

新建文件/修改文件 ```sudo gedit /etc/ros/rosdep/sources.list.d/20-default.list```

```shell
# os-specific listings first
yaml https://raw.githubusercontent.com/ros/rosdistro/master/rosdep/osx-homebrew.yaml osx

# generic
yaml https://raw.githubusercontent.com/ros/rosdistro/master/rosdep/base.yaml
yaml https://raw.githubusercontent.com/ros/rosdistro/master/rosdep/python.yaml
yaml https://raw.githubusercontent.com/ros/rosdistro/master/rosdep/ruby.yaml
gbpdistro https://raw.githubusercontent.com/ros/rosdistro/master/releases/fuerte.yaml fuerte

# newer distributions (Groovy, Hydro, ...) must not be listed anymore, they are being fetched from the rosdistro index.yaml instead
```

替换为

```shell
# os-specific listings first
yaml file:///etc/ros/rosdistro/master/rosdep/osx-homebrew.yaml osx

# generic
yaml file:///etc/ros/rosdistro/master/rosdep/base.yaml
yaml file:///etc/ros/rosdistro/master/rosdep/python.yaml
yaml file:///etc/ros/rosdistro/master/rosdep/ruby.yaml
gbpdistro file:///etc/ros/rosdistro/master/releases/fuerte.yaml feurte

# newer distributions (Groovy, Hydro, ...) must not be listed anymore, they are being fetched from the rosdistro index.yaml instead
```

至此，初始化成功

3、添加环境变量/问题 ```zsh: command not found: roscore```

bash:

```shell
echo "source /opt/ros/noetic/setup.bash" >> ~/.bashrc
source ~/.bashrc
```

zsh:

```shell
echo "source /opt/ros/noetic/setup.zsh" >> ~/.zshrc
source ~/.zshrc
```

4、测试小乌龟

```shell
#shell 1
rosrun

#shell 2
rosrun turtlesim turtlesim_node

#shell 3
rosrun turtlesim turtle_teleop_key
```

鼠标放在shell 3里面，按下上下左右键，可控制小乌龟，shell 2显示坐标。
