---
title: Python中一些好用的扩展包
date: 2023-04-04 12:22:01
---

> 正所谓“工欲善其事，必先利其器”。推荐几个常用的、且非常方便的Python扩展库

## 1、[pqi](https://pypi.org/project/pqi/)

> pqi解决pip安装速度较慢的问题

pip安装默认的软件源是国外的，下载起来速度很慢，而将软件源换成国内的镜像源之后，可以提高下载速度。手动编辑源文件比较麻烦，pqi则可以帮助我们直接切换软件源。

- 安装``` pip install pqi ```

- 使用方法

```shell
Usage:
  pqi ls
  pqi use <name>
  pqi show
  pqi add <name> <url>
  pqi remove <name>
  pqi (-h | --help)
  pqi (-v | --version)
Options:
  -h --help        Show this screen.
  -v --version     Show version.
```

查看当前的pip软件源```pqi show```

```shell
Current source is aliyun(https://mirrors.aliyun.com/pypi/simple/).
```

pqi中内置了5个软件源```pqi ls```

```shell
pypi 	 https://pypi.python.org/simple/
tuna 	 https://pypi.tuna.tsinghua.edu.cn/simple
douban 	 http://pypi.douban.com/simple/
aliyun 	 https://mirrors.aliyun.com/pypi/simple/
ustc 	 https://mirrors.ustc.edu.cn/pypi/web/simple
```

切换软件源```pqi use [url name]```，比如``` pqi use douban```，这样再查看软件源粉时候就发现已经切换了。

## 2、[pipreqs](https://pypi.org/project/pipreqs/)

> pipreqs可以生成Python依赖包清单，也就是导出requirements.txt文件

与```pip freeze > requirements.txt```的功能类似，但pipreqs只导出**指定项目所依赖的组件及其版本👌**，相比于前者导出**当前python环境下所有安装的组件**，pipsegs的导出会更轻量化。

- 安装```pip install pipreqs```
- 使用方法

```pipreqs 项目路径```，比如```pipreqs ./```。

- 对比一下freeze和pipreqs

|                        ```pip list```                        |             ```pip freeze > requirements.txt```              |            ```pipreqs ./```            |
| :----------------------------------------------------------: | :----------------------------------------------------------: | :------------------------------------: |
| aiofiles              23.1.0<br/>altair                4.2.2<br/>anyio                 3.6.2<br/>attrs                 22.2.0<br/>blinker               1.5<br/>cachetools            5.3.0<br/>certifi               2022.12.7<br/>charset-normalizer    3.1.0<br/>ci-info               0.3.0<br/>click                 8.1.3<br/>configobj             5.0.8<br/>configparser          5.3.0<br/>decorator             5.1.1<br/>entrypoints           0.4<br/>etelemetry            0.3.0<br/>filelock              3.10.7<br/>fitz                  0.0.1.dev2<br/>frontend              0.0.3<br/>future                0.18.3<br/>gitdb                 4.0.10<br/>GitPython             3.1.31<br/>h11                   0.14.0<br/>httplib2              0.22.0<br/>idna                  3.4<br/>importlib-metadata    6.1.0<br/>isodate               0.6.1<br/>itsdangerous          2.1.2<br/>Jinja2                3.1.2<br/>jsonschema            4.17.3<br/>looseversion          1.1.2<br/>lxml                  4.9.2<br/>markdown-it-py        2.2.0<br/>MarkupSafe            2.1.2<br/>mdurl                 0.1.2<br/>networkx              3.0<br/>nibabel               5.0.1<br/>nipype                1.8.5<br/>numpy                 1.24.2<br/>packaging             23.0<br/>pandas                1.5.3<br/>pathlib               1.0.1<br/>Pillow                9.4.0<br/>pip                   22.0.2<br/>protobuf              3.20.3<br/>prov                  2.0.0<br/>pyarrow               11.0.0<br/>pydeck                0.8.0<br/>pydot                 1.4.2<br/>Pygments              2.14.0<br/>Pympler               1.0.1<br/>PyMuPDF               1.21.1<br/>pyparsing             3.0.9<br/>pyrsistent            0.19.3<br/>python-dateutil       2.8.2<br/>pytils                0.4.1<br/>pytz                  2022.7.1<br/>pytz-deprecation-shim 0.1.0.post0<br/>pyxnat                1.5<br/>rdflib                6.3.1<br/>requests              2.28.2<br/>rich                  13.3.2<br/>scipy                 1.10.1<br/>semver                2.13.0<br/>setuptools            59.6.0<br/>simplejson            3.18.4<br/>six                   1.16.0<br/>smmap                 5.0.0<br/>sniffio               1.3.0<br/>starlette             0.26.1<br/>stqdm                 0.0.5<br/>streamlit             1.20.0<br/>toml                  0.10.2<br/>tools                 0.1.9<br/>toolz                 0.12.0<br/>tornado               6.2<br/>tqdm                  4.65.0<br/>traits                6.3.2<br/>typing_extensions     4.5.0<br/>tzdata                2022.7<br/>tzlocal               4.3<br/>urllib3               1.26.15<br/>uvicorn               0.21.1<br/>validators            0.20.0<br/>watchdog              3.0.0<br/>wheel                 0.37.1<br/>zipp                  3.15.0 | aiofiles==23.1.0<br/>altair==4.2.2<br/>anyio==3.6.2<br/>attrs==22.2.0<br/>blinker==1.5<br/>cachetools==5.3.0<br/>certifi==2022.12.7<br/>charset-normalizer==3.1.0<br/>ci-info==0.3.0<br/>click==8.1.3<br/>configobj==5.0.8<br/>configparser==5.3.0<br/>decorator==5.1.1<br/>entrypoints==0.4<br/>etelemetry==0.3.0<br/>filelock==3.10.7<br/>fitz==0.0.1.dev2<br/>frontend==0.0.3<br/>future==0.18.3<br/>gitdb==4.0.10<br/>GitPython==3.1.31<br/>h11==0.14.0<br/>httplib2==0.22.0<br/>idna==3.4<br/>importlib-metadata==6.1.0<br/>isodate==0.6.1<br/>itsdangerous==2.1.2<br/>Jinja2==3.1.2<br/>jsonschema==4.17.3<br/>looseversion==1.1.2<br/>lxml==4.9.2<br/>markdown-it-py==2.2.0<br/>MarkupSafe==2.1.2<br/>mdurl==0.1.2<br/>networkx==3.0<br/>nibabel==5.0.1<br/>nipype==1.8.5<br/>numpy==1.24.2<br/>packaging==23.0<br/>pandas==1.5.3<br/>pathlib==1.0.1<br/>Pillow==9.4.0<br/>protobuf==3.20.3<br/>prov==2.0.0<br/>pyarrow==11.0.0<br/>pydeck==0.8.0<br/>pydot==1.4.2<br/>Pygments==2.14.0<br/>Pympler==1.0.1<br/>PyMuPDF==1.21.1<br/>pyparsing==3.0.9<br/>pyrsistent==0.19.3<br/>python-dateutil==2.8.2<br/>pytils==0.4.1<br/>pytz==2022.7.1<br/>pytz-deprecation-shim==0.1.0.post0<br/>pyxnat==1.5<br/>rdflib==6.3.1<br/>requests==2.28.2<br/>rich==13.3.2<br/>scipy==1.10.1<br/>semver==2.13.0<br/>simplejson==3.18.4<br/>six==1.16.0<br/>smmap==5.0.0<br/>sniffio==1.3.0<br/>starlette==0.26.1<br/>stqdm==0.0.5<br/>streamlit==1.20.0<br/>toml==0.10.2<br/>tools==0.1.9<br/>toolz==0.12.0<br/>tornado==6.2<br/>tqdm==4.65.0<br/>traits==6.3.2<br/>typing_extensions==4.5.0<br/>tzdata==2022.7<br/>tzlocal==4.3<br/>urllib3==1.26.15<br/>uvicorn==0.21.1<br/>validators==0.20.0<br/>watchdog==3.0.0<br/>zipp==3.15.0 | PyMuPDF==1.21.1<br />streamlit==1.20.0 |

## 3、[Streamlit](https://streamlit.io/)

> Streamlit主要用来创建App，并且可以方便的和Python结合以及部署。相关的安装使用可以参考之前的文章

{% link Streamlit App创建,Guo Wang,https://King-Key.github.io/posts/34479.html%}

{% link Streamlit App多页面运行,Guo Wang,https://King-Key.github.io/posts/22558.html%}

{% link streamlit cloud部署一个streamlit App,Guo Wang,https://King-Key.github.io/posts/cda857c1.html%}

## 4、[tqdm](https://tqdm.github.io/)

> tqdm是一个进度条模块

- 安装```pip install tqdm```
- 使用方法，在Python文件中直接引入使用即可

![](https://img.tqdm.ml/tqdm.gif)

<center>官方demo演示</center>

