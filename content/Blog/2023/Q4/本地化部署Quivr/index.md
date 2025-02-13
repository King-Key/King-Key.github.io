---
title: 本地化部署Supabase
date: 2023-11-29 07:22:46
extra:
 image: /Blog/2023/Q4/ben-di-hua-bu-shu-quivr/image-20231129073220106-1214348.png
---

> 矢量数据库的安装

<!--more-->

###  supabase安装 [^1]

![image-20231129073220106](./image-20231129073220106-1214348.png)

- 问题1

```shell
docker: 'compose' is not a docker command. See 'docker --help'
```

解决

```shell
sudo curl -L "https://github.com/docker/compose/releases/download/v2.6.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

sudo chmod +x /usr/local/bin/docker-compose
```

- 问题2

```shell
error getting credentials - err: exit status 1, out: `Cannot autolaunch D-Bus without X11 $DISPLAY`
```

解决

```shell
sudo apt-get install pass gnupg2
```

参考链接：

[^1]: https://supabase.com/docs/guides/self-hosting/docker#running-supabase
