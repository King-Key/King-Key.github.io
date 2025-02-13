---
title: git的协作使用
date: 2023-11-23 14:31:49
---

> 小型团队协作场景下，需要使用的git命令

<!--more-->

```shell
git branch //查看分支
git checkout -b 【name】 //本地创建分支
git status //查看状态
git checkout 【name】 //切换分支
git pull //更新主分支
git rebase main //将分支合并到主分支，此时需要按照提示修改内容并重新提交
git merge 【name】 // 
git push //提交到远程
```

### 2、git的使用
```shell
git branch -a //查看本地所有分析
git push
```