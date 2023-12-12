---
# 这是文章的标题
title: 模板方法模式-实践
# 你可以自定义封面图片
# cover: /assets/images/cover1.jpg
# 这是页面的图标
icon: file
# 这是侧边栏的顺序
order: 1
# 设置作者
author: moonandcake
# 设置写作时间
date: 2023-12-12
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

定义：是一种只需使用继承就可以实现的非常简单的模式

模板方法模式由两部分结构组成，第一部分是抽象父类，第二部分是具体的实现子类。通常
在抽象父类中封装了子类的算法框架，包括实现一些公共方法以及封装子类中所有方法的执行顺
序。子类通过继承这个抽象类，也继承了整个算法结构，并且可以选择重写父类的方法。


## 前端发布—订阅模式应用

    var Beverage = function( param ){
        var boilWater = function(){
            console.log( '把水煮沸' );
        };
        var brew = param.brew || function(){
            throw new Error( '必须传递 brew 方法' );
        };
        var pourInCup = param.pourInCup || function(){
            throw new Error( '必须传递 pourInCup 方法' );
        };
        var addCondiments = param.addCondiments || function(){
            throw new Error( '必须传递 addCondiments 方法' );
        };
        var F = function(){};
        F.prototype.init = function(){
            boilWater();
            brew();
            pourInCup();
            addCondiments();
        };
        return F;
    };
    var Coffee = Beverage({ 
        brew: function(){ 
            console.log( '用沸水冲泡咖啡' ); 
        }, 
        pourInCup: function(){ 
            console.log( '把咖啡倒进杯子' ); 
        }, 
        addCondiments: function(){ 
            console.log( '加糖和牛奶' ); 
        } 
    });
    var Tea = Beverage({ 
        brew: function(){ 
            console.log( '用沸水浸泡茶叶' ); 
        }, 
        pourInCup: function(){ 
            console.log( '把茶倒进杯子' ); 
        }, 
        addCondiments: function(){ 
            console.log( '加柠檬' ); 
        } 
    }); 
    var coffee = new Coffee(); 
    coffee.init(); 
    var tea = new Tea(); 
    tea.init();

在这段代码中，我们把 brew、pourInCup、addCondiments 这些方法依次传入 Beverage 函数，
Beverage 函数被调用之后返回构造器 F。F 类中包含了“模板方法”F.prototype.init。跟继承得
到的效果一样，该“模板方法”里依然封装了饮料子类的算法框架。

## 总结

模板方法模式是一种典型的通过封装变化提高系统扩展性的设计模式。在传统的面向对象语
言中，一个运用了模板方法模式的程序中，子类的方法种类和执行顺序都是不变的，所以我们把
这部分逻辑抽象到父类的模板方法里面。而子类的方法具体怎么实现则是可变的，于是我们把这
部分变化的逻辑封装到子类中。通过增加新的子类，我们便能给系统增加新的功能，并不需要改
动抽象父类以及其他子类，这也是符合开放封闭原则的。
但在 JavaScript 中，我们很多时候都不需要依样画瓢地去实现一个模版方法模式，高阶函数
是更好的选择。