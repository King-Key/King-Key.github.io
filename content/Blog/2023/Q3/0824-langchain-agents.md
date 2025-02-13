---
title: 🖋 langchain Agents
date: 2023-08-24 17:19:59
---

> Agents

<!--more-->

## 1、Agents(代理)

> Agents使用LLM来确认下一步用什么工具，执行什么操作。

- 工具：执行具体功能的函数：比如搜索，数据库查找等；

- LLM：为Agents提供动力的语言模型；

- Agents：

## 2、使用

- 加载LLM

```python
llm=OpenAI(temperature=0)
```

- 加载工具

```python
from langchain.agents import load_tools
from langchain.agents import initialize_agent

tools = load_tools(["serpapi", "llm-math"], llm=llm)
```

- 使用工具

```python
from langchain.agents import AgentType

agent = initialize_agent(tools, llm, agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION, verbose=True)
```

- 执行

```python
agent.run("Who is Leo DiCaprio's girlfriend? What is her current age raised to the 0.43 power?")
```

## 3、Agents+ChatGLM2-6B

```python
from langchain.llms import ChatGLM
from langchain.agents import load_tools
from langchain.agents import initialize_agent
from langchain.agents import AgentType

endpoint_url = "http://127.0.0.1:8000/"

llm=OpenAI(endpoint_url=endpoint_url,temperature=0)

tools = load_tools(["serpapi", "llm-math"], llm=llm)

agent = initialize_agent(tools, llm, agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION, verbose=True)

agent.run("Who is Leo DiCaprio's girlfriend? What is her current age raised to the 0.43 power?")
```

## 4、AgentType（代理类型）

- `zero-shot-react-description`：基于工具的描述来确认使用的工具
- `react-docstore`：存储文档的交互
- `react-docstore`：查找问题的事实性答案
- `conversational-react-description`：对话中的Propmpt设计

## 5、Tools（可调用的工具）

- 官网工具

  > https://www.langchain.asia/modules/agents/tools/getting_started

- 自定义

