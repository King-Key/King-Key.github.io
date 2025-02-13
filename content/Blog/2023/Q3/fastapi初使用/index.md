---
title: 🖋 fastapi初使用
date: 2023-07-10 07:13:28
---

> fastapi 是一个基于 Python 的 API 构建框架，简单且易用！

<!--more-->

#### 1、安装

安装，主要分为两部分：

1）```fastapi```：``` pip install fastapi```

2）```uvicorn```:``` pip install uvicorn```。服务器端，可以用来运行fastapi的代码。

也可以一起安装```pip install fastapi[all]```

#### 2、api实现

```python
from typing import Union
from fastapi import FastAPI

app = FastAPI()

@app.get("/1")
def read_root():
    return ("hello")
```

##### ```app.get("/1)```

api路径引入,也就是用 1 调用 read_root函数，最终返回一个 hello。
![Alt text](./image.png)

##### ```app.get("/{a})```

```PYTHON
@app.get("/{a}")
def read_root(a:int):
    return ("hello")
```

也可以输入值,当输入一个int型参数，调用 read_root函数，返回一个 hello。
![Alt text](./image1.png)

##### ```@app.get("/{a}+{b}")```

```python
@app.get("/{a}+{b}")
def read_root(a:int,b:int):
    return (a+b)
```

实现一个```a+b```的API。

![Alt text](./image2.png)

##### 函数和api分离

不可能把所有的api函数都放在一个```.py```文件中，在```python```文件中可以通过```import```调用函数。

- ```sum.py```,定义了一个```add```函数，实现```a+b```
  
  ```python
  def add(a,b):
    print(a+b)
    return a+b
  ```

- ```main.py```,调用```add```函数
  
  ```python
  from typing import Union
  from fastapi import FastAPI
  
  from num import add
  
  app = FastAPI()
  
  @app.get("/{a}+{b}")
  def read_root(a:int,b:int):
      return add(a,b)
  ```
  ![Alt text](./image3.png)

#### 3、运行
```shell
uvicorn main:app --reload
```

ok，结束！

