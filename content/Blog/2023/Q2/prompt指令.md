---
title: chatgpt prompt学习
date: 2023-06-01 17:06:14
---

> 怎么可以用好ChatGPT，prompt是关键！

<!--more-->

#### 1、prompt的基本原则
- 开头提供明确说明，有助于为模型设置上下文
- 指定预期答案的格式类型
- 可以加入系统消息或角色扮演技术增强交互

#### 2、基础prompt工程策略
- 正确的prompt关键词
- 简洁的prompt
- 角色分配和目标设置，也就是需要明确一个具体场景
- 正负提示，即告诉模型应该**这样做**、**不这样做**
#### 3、高级策略
- 输入/输出prompt：给模型说明输入什么，输入什么
- Zero-shot prompt：零样本，模糊的提问
- One-shot prompt：给模型一个样例
- Few-shot prompt：给模型多个样例
- 思维链 Prompt：给模型一个事件的推理的过程，引导模型按此进行推理
- Self-Criticism prompt策略：引导模型对其输出进行评估并进行改进
- 迭代prompt策略：逐步引导
- 与模型合作
	- prompt的prompt：让模型生成prompt的建议
	- 模型引导prompt：给定模型结果，让模型反推输入过程
#### 4、prompt案例

- 图片生成
```shell
接下来我会给你指令，生成相应的图片，我希望你用Markdown语言生成，不要用反引号，不要用代码框，你需要用Unsplash API，遵循以下的格式：https://source.unsplash.com/1600x900/?< PUT YOUR QUERY HERE >。你明白了吗？
```

- 对话思考
```shell
我是【角色】，正在【做什么】，目标是【什么】，请你以提问的方式向我提出你认为达成该目标最重要的数量【5】个关键性问题
```




