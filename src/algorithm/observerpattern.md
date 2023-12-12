---
# 这是文章的标题
title: 发布-订阅模式-实践
# 你可以自定义封面图片
# cover: /assets/images/cover1.jpg
# 这是页面的图标
icon: file
# 这是侧边栏的顺序
order: 1
# 设置作者
author: moonandcake
# 设置写作时间
date: 2023-12-11
# 一个页面可以有多个分类
# category:
#   - 使用指南
# 一个页面可以有多个标签
# tag:
#   - 页面配置
#   - 使用指南
# 此页面会在文章列表置顶
sticky: false
# 此页面会出现在文章收藏中
star: true
# 你可以自定义页脚
footer:
# 你可以自定义版权信息
copyright:
---

<!-- more -->


## 发布—订阅模式

定义：又叫观察者模式，它定义对象间的一种一对多的依赖关系，当一个对象的状
态发生改变时，所有依赖于它的对象都将得到通知。


## 前端发布—订阅模式应用
网站登录
假如我们正在开发一个商城网站，网站里有 header 头部、nav 导航、消息列表、购物车等模块。这几个模块的渲染有一个共同的前提条件，就是必须先用 ajax 异步请求获取用户的登录信息。
这是很正常的，比如用户的名字和头像要显示在 header 模块里，而这两个字段都来自用户登录后
返回的信息。至于 ajax 请求什么时候能成功返回用户信息，这点我们没有办法确定。现在的情节看起来像
极了售楼处的例子，小明不知道什么时候开发商的售楼手续能够成功办下来。
但现在还不足以说服我们在此使用发布—订阅模式，因为异步的问题通常也可以用回调函数
来解决。更重要的一点是，我们不知道除了 header 头部、nav 导航、消息列表、购物车之外，将
来还有哪些模块需要使用这些用户信息。如果它们和用户信息模块产生了强耦合，比如下面这样
的形式：

    login.succ(function(data){ 
        header.setAvatar( data.avatar); // 设置 header 模块的头像
        nav.setAvatar( data.avatar ); // 设置导航模块的头像
        message.refresh(); // 刷新消息列表
        cart.refresh(); // 刷新购物车列表
    });

现在登录模块是我们负责编写的，但我们还必须了解 header 模块里设置头像的方法叫
setAvatar、购物车模块里刷新的方法叫 refresh，这种耦合性会使程序变得僵硬，header 模块不
能随意再改变 setAvatar 的方法名，它自身的名字也不能被改为 header1、header2。 这是针对具
体实现编程的典型例子，针对具体实现编程是不被赞同的。
等到有一天，项目中又新增了一个收货地址管理的模块，这个模块本来是另一个同事所写的，
而此时你正在马来西亚度假，但是他却不得不给你打电话：“Hi，登录之后麻烦刷新一下收货地
址列表。”于是你又翻开你 3 个月前写的登录模块，在最后部分加上这行代码：

    login.succ(function( data ){ 
        header.setAvatar( data.avatar); 
        nav.setAvatar( data.avatar ); 
        message.refresh(); 
        cart.refresh(); 
        address.refresh(); // 增加这行代码
    });

用发布—订阅模式重写之后，对用户信息感兴趣的业务模块将自行订阅登录成功的消息事件。
当登录成功时，登录模块只需要发布登录成功的消息，而业务方接受到消息之后，就会开始进行
各自的业务处理，登录模块并不关心业务方究竟要做什么，也不想去了解它们的内部细节。改善
后的代码如下：

    $.ajax( 'http:// xxx.com?login', function(data){ // 登录成功
        login.trigger( 'loginSucc', data); // 发布登录成功的消息
    });

各模块监听登录成功的消息：
    var header = (function(){ // header 模块
        login.listen( 'loginSucc', function( data){ 
            header.setAvatar( data.avatar ); 
        }); 
        return { 
            setAvatar: function( data ){ 
            console.log( '设置 header 模块的头像' ); 
        } 
    } 
    })(); 
    var nav = (function(){ // nav 模块
    login.listen( 'loginSucc', function( data ){ 
        nav.setAvatar( data.avatar ); 
        }); 
        return { 
            setAvatar: function( avatar ){ 
                console.log( '设置 nav 模块的头像' ); 
            } 
        } 
    })();

如上所述，我们随时可以把 setAvatar 的方法名改成 setTouxiang。如果有一天在登录完成之
后，又增加一个刷新收货地址列表的行为，那么只要在收货地址模块里加上监听消息的方法即可，
而这可以让开发该模块的同事自己完成，你作为登录模块的开发者，永远不用再关心这些行为了。
代码如下：

    var address = (function(){ // nav 模块
        login.listen( 'loginSucc', function( obj ){ 
            address.refresh( obj ); 
        }); 
        return { 
            refresh: function( avatar ){ 
                console.log( '刷新收货地址列表' ); 
            } 
        } 
    })();
## 总结

发布—订阅模式的优点非常明显，一为时间上的解耦，二为对象之间的解耦。它的应用非常
广泛，既可以用在异步编程中，也可以帮助我们完成更松耦合的代码编写。发布—订阅模式还可
以用来帮助实现一些别的设计模式，比如中介者模式。从架构上来看，无论是 MVC 还是 MVVM，
都少不了发布—订阅模式的参与，而且 JavaScript 本身也是一门基于事件驱动的语言。 
当然，发布—订阅模式也不是完全没有缺点。创建订阅者本身要消耗一定的时间和内存，而
且当你订阅一个消息后，也许此消息最后都未发生，但这个订阅者会始终存在于内存中。另外，
发布—订阅模式虽然可以弱化对象之间的联系，但如果过度使用的话，对象和对象之间的必要联
系也将被深埋在背后，会导致程序难以跟踪维护和理解。特别是有多个发布者和订阅者嵌套到一
起的时候，要跟踪一个 bug 不是件轻松的事情。
