---
title: hexo butterlfy主题中几个好用的外挂标签
date: 2023-04-11 14:20:44
---

> 记录保存，方便自己用

<!-- more -->

####  1、tab

{% tabs 代码 %}

sss

<!-- tab 语法 -->

```
{% tabs tab,2 %}
<!-- tab 展示1 -->
this is tab1
<!-- endtab -->

<!-- tab 展示2-->
this is tab2
<!-- endtab -->

{% endtabs %}
```

<!-- endtab -->

<!-- tab 展示1-->

<!-- tab -->
this is tab1
<!-- endtab -->

<!-- tab 展示2 -->
this is tab2
<!-- endtab -->

<!-- endtab -->

{% endtabs %}



#### 2、timeline

{% tabs 代码 %}

<!-- tab 语法-->

```html
{% timeline title,color %}
<!-- timeline title -->
xxxxx
<!-- endtimeline -->
<!-- timeline title -->
xxxxx
<!-- endtimeline -->
{% endtimeline %}
```

<!--endtab-->

<!-- tab 展示-->
{% timeline title,color %}
<!-- timeline title -->
xxxxx
<!-- endtimeline -->
<!-- timeline title -->
xxxxx
<!-- endtimeline -->
{% endtimeline %}

<!-- endtab -->

{% endtabs %}


#### 3、details
> markdown中都支持，不局限于butterfly主题

{% tabs 代码 %}

<!-- tab 语法-->

```html
<details>
    <summary>展开!</summary>
内容展开
</details>
```

<!--endtab-->

<!-- tab 展示-->
<details>
    <summary>展开!</summary>
内容展开
</details>

<!-- endtab -->

{% endtabs %} 