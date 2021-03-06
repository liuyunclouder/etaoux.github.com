---
layout: post
title: BRIX 组件架构（三）
category: arch
---

## 基于 Tab 和 TabConfiger 组件深入分析

![1](/assets/img/brix-arch/3/1.jpg)
![1](/assets/img/brix-arch/3/2.png)

**以串行方式渲染Tab和TabConfiger重点核心代码框架如下：**

{% highlight html linenos %}
<script type="template" id="tmpl_1">
  <div brix="tab">
    <!--#keyArea-->
    <ul subtmpl="tablist;currentid">
      {{#tablist}}
      <li {{#currentid}}class="current"{{/currentid}}>{{text}}</li>
      {{/tablist}}
    </ul>
    <!--/keyArea-->
    <span>write anything</span>
    <!--#tabConfiger-->
    <div brix="tabconfiger">
      <button>configer</button>
      <div>
        <ul>
          {{#allList}}
            <input type="checkbox" {{#checkedList}}checked{{/checkedList}}/>{{text}}
          {{/allList}}
        </ul>
      </div>
    </div>
    <!--/tabConfiger-->
  </div>
</script>
{% endhighlight %}

以上是模板部分，有几个关键点

- 通过brix属性（所有命名规范，钩子规则待后再讨论），指明组件类别，tab、tabconfiger
- 通过subtmpl属性，将模板内的关键数据区域标识出来，通过逸才提出的很巧妙的办法，可以在初次解析模板时，将子模板从模板中提取出来。
- 从模板内容可以分析出，模板"不等于"某个组件，模板作为一个html片段可以包含任意多的组件，这需要模板渲染之后addBehavior代码把所有组件行为分别关联上。

仔细观察这段模板，我们采用模板系统的优势体现在如下几个方面

- 如果开始没有tabconfiger，只有tab。后续需求需要加入tabconfiger，不需要改动tab相关的js代码，嵌入方式非常直观。
- 如果<span>write anything</span>有业务意义，tabconfiger加入它前面还是后面，只是copy&paste时就可以决定，且随时可以调整
- 如果<span>write anything</span>有业务意义，修改span里的内容非常容易。使用模板将行为和html分离，能够更方便的保障：如果我们希望把这个span去掉，那tab的其他功能仍然正常运行不受影响。

{% highlight javascript linenos %}
<script>
  //tab 承载数据
  var tabList = [A,B,C];
  var currentId = A;
  //tabConfiger 承载数据
  var allList = [A,B,C,D,E];
  var checkedList = tabList;
  //渲染数据
  var data = {
    tabList:tabList,
    currentId:currentId,
    allList:allList,
    checkedList:checkedList
  }
  //构建html
  var s = Mustache.to_html("tmpl_1",data);
  s += "<scr"+"ipt>addBehavior('tmpl_1')</scr"+"ipt>";
  //输出html，后启动addBehavior动作
  document.write(s);
</script>
{% endhighlight %}

以上是后续Action，拼装数据和模板之后输出到页面上，再启动addBehavior把组件行为与html关联上。

*代码中使用了doc.write只是为了模拟代码在后台运行时常见的同步输出，当然可以使用异步方式实现同样功能*

![1](/assets/img/brix-arch/3/33.jpg)

我们关注数据部分：

- **在渲染之前，如果组件间需要share数据，可以通过引用指向同一对象，如tab组件的“tabList”和tabConfiger组件的“checkedList”是指向一份数据**
- **渲染之后要避免，没有父子关系的组件share同一个引用，这样对数据的改动，会导致组件绕过组件间通信机制相互通信，甚至相互造成不可预料的影响**

![1](/assets/img/brix-arch/3/44.jpg)

**接下来关注AddBehavior的动作：**

1. 把刚刚渲染的模板中所有组件跟节点拿到
2. 查看每一个组件是否是某个组件的子组件
  1. 如果不是，组件间addBehavior没有次序，继续下边的流程逐个渲染组件
  2. 对于那些子组件，子组件的addBehavior交由其父组件完成（具体流程待讨论）
3. 开始逐个addBehavior（new Brix）的流程：
  1. 不能再和其他组件贡献一份数据，比如tabList,checkedList要从指向的同一份数据，clone出来，再作为组件的数据ATTR，set进去
  2. AttachEvent,注册交互事件，会参照magix的mxclick处理，但将修改magix中mxclick事件默认停止冒泡的行为，会在处理过的event对象里边留下响应的痕迹，供上层event代理节点参考。
  3. 将组件内的子模板提取出来，建立子模板与组件内部分或全部数据变动之间的关联。
  4. 做desc方法。

**对于模板的处理技巧，来自逸才：**
模板虽然是字符串，但也是结构化的，我们可以把模板塞入一个不在dom节点内的fragment中，不输入数据就模板字符串结构化，把模板语法标记当做text节点。 这样模板也变成了结构化数据对象，Dom操作的一切方法皆可稳定的应用其上。我们可以用来提取子模板，甚至预先提取出模板内组件的层次关系等等信息。

**最后重新回顾一下之前说的组件加入Dom的方式：**
一种方式是Dom方法，创建好文档片段，插入到Dom树中
另一种是拼接文档字符串，通过innerHTML,doc.write等方法，把字符串加入Dom树中，在innerHTML内部，会自动将字符串转化为fragment
我们是采用第二种方式，把模板和数据渲染结果字符串，通过innerHTML或doc.write加入到Dom树中，后续的addBehavior，相当于扩展了innerHTML,doc.write，在字符串转化为dom节点后，再把标识为组件的dom节点的组件行为附加上。