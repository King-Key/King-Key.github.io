---
title: 🖋 langchain初学习
date: 2023-07-17 15:48:54
---

> [LangChain](https://docs.langchain.com/docs/) is a framework for developing applications powered by language models(LangChain是一个由语言模型驱动的应用程序开发框架，旨在帮助开发人员使用语言模型构建端到端的应用程序)

## 1、一些概念

### Components and Chains

- Component 是模块化的构建块，可以组合起来创建强大的应用程序。
- Chain 是组合在一起以完成特定任务的一系列 Components。一个 Chain 可能包括一个 Prompt 模板、一个语言模型和一个输出解析器，它们一起工作以处理用户输入、生成响应并处理输出。

### Prompt Templates and Values

- Prompt Templates 负责创建 PromptValue，这是最终传递给语言模型的内容。有助于将用户输入和其他动态信息转换为适合语言模型的格式。
- PromptValues 是具有方法的类，这些方法可以转换为每个模型类型期望的确切输入类型（如文本或聊天消息）。

### Example Selectors

- 可以在 Prompt 中动态包含示例，接受用户输入并返回一个示例列表以在提示中使用，使其更强大和特定于上下文。

### Output Parsers

- 负责将语言模型响应构建为更有用的格式，使得在应用程序中处理输出数据变得更加容易。实现了两种主要方法：
  - 一种用于提供格式化指令。
  - 一种用于将语言模型的响应解析为结构化格式。

### Indexes and Retrievers

- Index 是一种组织文档的方式，使语言模型更容易与它们交互。
- Retrievers 是用于获取相关文档并将它们与语言模型组合的接口。

> LangChain 提供了用于处理不同类型的索引和检索器的工具和功能，例如矢量数据库和文本拆分器。

### Chat Message History

- 主要通过聊天界面与语言模型进行交互。

> ChatMessageHistory 类负责记住所有以前的聊天交互数据，然后可以将这些交互数据传递回模型、汇总或以其他方式组合。这有助于维护上下文并提高模型对对话的理解。

### Agents and Toolkits

- Agent 是在 LangChain 中推动决策制定的实体。他们可以访问一套工具，并可以根据用户输入决定调用哪个工具。
- Tookits 是一组工具，当它们一起使用时，可以完成特定的任务。代理执行器负责使用适当的工具运行代理。

### LangChain model

LangChain 中的模型主要分为三类

- **LLM（大型语言模型）**：可以将文本字符串作为输入并返回文本字符串作为输出。
- **聊天模型( Chat Model)** ：将聊天消息列表作为输入并返回聊天消息。用于管理对话历史记录和维护上下文。
- **文本嵌入模型(Text Embedding Models)** ：将文本作为输入并返回表示文本嵌入的浮点列表。用于文档检索、聚类和相似性比较等任务。

## 2、安装

``` pip install langchain``` or ```pip install langchain[all]``` or ```pip install langchain[llm]```

```zsh``` 安装需要使用 ```pip install 'langchain[all]' ```
