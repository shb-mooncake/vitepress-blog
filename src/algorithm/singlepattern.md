---
# 这是文章的标题
title: 单例模式-实践
# 你可以自定义封面图片
# cover: /assets/images/cover1.jpg
# 这是页面的图标
icon: file
# 这是侧边栏的顺序
order: 1
# 设置作者
author: moonandcake
# 设置写作时间
date: 2023-12-08
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



## 单例模式

定义：保证一个类仅有一个实例，并提供一个访问它的全局访问点

用途：主要解决一个全局使用的类频繁地创建和销毁，占用内存

## 应用场景

- 对于前端应用的许多基本组件：比如 dialog、message 等等，会被全局频繁使用，就应该维护一个全局唯一的实例，避免重复创建带来不必要的资源消耗。业务组件也同理：比如购物车组件、登录弹窗组件等

- 对于一些通用的工具库，经常会使用单例模式。比如我们通常会创建一个全局唯一的 axios 实例来发起网络请求

## 单例模式实现

- 闭包实现
- ES6 实现

        // 利用闭包实现
        var Singleton = (function () {
        var instance;
        function Instance() {}
        return function () {
            if (!instance) {
            instance = new Instance();
            }
            return instance;
        };
        })();

        var single1 = Singleton();
        var single2 = Singleton();

        console.log(single1 === single2); // true


        // ES6实现
        class Singleton {
            constructor() {
                if (!Singleton.instance) {
                Singleton.instance = this;
                }
                return Singleton.instance;
            }
        }

        const single1 = new Singleton();
        const single2 = new Singleton();

        console.log(single1 === single2); // true

## 通用的惰性单例

惰性单例：初始化时不进行实例创建，到获取实例时才进行实例创建，类似前端的资源懒加载思想

创建对象的方法 fn 被当成参数动态传入 getSingle 函数

    var getSingle = function( fn ){
        var result;
        return function(){
            return result || ( result = fn .apply(this, arguments ) );
        }
    };

接下来将用于创建登录浮窗的方法用参数 fn 的形式传入 getSingle，我们不仅可以传入
createLoginLayer，还能传入 createScript、createIframe、createXhr 等。之后再让 getSingle 返回
一个新的函数，并且用一个变量 result 来保存 fn 的计算结果。result 变量因为身在闭包中，它永远不会被销毁。在将来的请求中，如果 result 已经被赋值，那么它将返回这个值。代码如下：

    var createLoginLayer = function(){
        var div = document.createElement( 'div' );
        div.innerHTML = '我是登录浮窗';
        div.style.display = 'none';
        document.body.appendChild( div );
        return div;
    };
    var createSingleLoginLayer = getSingle( createLoginLayer );
    document.getElementById( 'loginBtn' ).onclick = function(){
        var loginLayer = createSingleLoginLayer();
        loginLayer.style.display = 'block';
    };

下面我们再试试创建唯一的 iframe 用于动态加载第三方页面：

    var createSingleIframe = getSingle( function(){
        var iframe = document.createElement ( 'iframe' );
        document.body.appendChild( iframe );
        return iframe;
    });
    document.getElementById( 'loginBtn' ).onclick = function(){
        var loginLayer = createSingleIframe();
        loginLayer.src = 'http://baidu.com';
    };

在这个例子中，我们把创建实例对象的职责和管理单例的职责分别放置在两个方法里，这两
个方法可以独立变化而互不影响，当它们连接在一起的时候，就完成了创建唯一实例对象的功能，
看起来是一件挺奇妙的事情。

## 总结

单例模式是一种简单但非常实
用的模式，特别是惰性单例技术，在合适的时候才创建对象，并且只创建唯一的一个。更奇妙的
是，创建对象和管理单例的职责被分布在两个不同的方法中，这两个方法组合起来才具有单例模
式的威力。
