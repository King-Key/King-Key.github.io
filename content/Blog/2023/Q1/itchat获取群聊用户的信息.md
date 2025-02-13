---
title: itchat获取群聊用户的信息
date: 2022-07-30 12:10:47
---

> 不是所有的微信账号都可以登陆网页版微信的哦

<!--more-->

#### 1、安装itchat

`pip install itchat`
python扩展包的安装太简单了，就只需要一行命令就可以解决

#### 2、利用itchat获取群聊好友的信息

直接上代码，代码里面会有相关的注释的

```
#!/usr/bin/env python

import os
import sys
import xlsxwriter
import itchat,time
from itchat.content import TEXT

 #其中hotReload=True参数是为了短暂记忆登录状态，避免每登录一次就扫一次二维码
itchat.auto_login(hotReload=True)
#获取群聊信息
roomslist = itchat.get_chatrooms(update=True)

#插入excel
#创建excel表单
workbook=xlsxwriter.Workbook("群聊用户名单.xlsx")
for i in range(0,len(roomslist)-1):
    #根据群聊名称在表单中创建工作薄
    worksheet=workbook.add_worksheet(roomslist[i]['NickName'])
    #添加表头
    worksheet.write(0,0,"微信名称")
    worksheet.write(0,1,"群备注")
    #获取群聊用户列表
    myroom=itchat.search_chatrooms(name=roomslist[i]['NickName'])
    #获取群聊名称
    gsp=itchat.update_chatroom(myroom[0]['UserName'], detailedMember=True)
    print("群名：{} \t 人数：{}".format(roomslist[i]['NickName'],len(gsp['MemberList'])))

    nickname=[]
    displayname=[]

    for c in gsp['MemberList']:
        nickname.append(c['NickName'])
        displayname.append(c['DisplayName'])
    #将用户信息写入相应的工作薄中
    for x in range(len(gsp['MemberList'])):
        worksheet.write(x+1,0,nickname[x])
        worksheet.write(x+1,1,displayname[x])
    #输出一点提示信息
	print("sheet {} finished".format(roomslist[i]['NickName']))
#关闭工作表
workbook.close()

PYTHON
```

#### 3、中间出现的问题

- 有的微信号无法登录

> 好像说是新申请的无法登录，可以试试能否登录网页版微信，能登录网页版微信就可以登录itchat，反之一样

- 群聊显示不全

> 这里的群聊默认是只显示已经保存在通讯录里面的群聊