---
# 这是文章的标题
title: 策略模式-实践
# 你可以自定义封面图片
# cover: /assets/images/cover1.jpg
# 这是页面的图标
icon: file
# 这是侧边栏的顺序
order: 1
# 设置作者
author: sunhaibo
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


## 策略模式

定义：定义了一系列的算法，并将每个算法封装起来，使它们可以互相替换

对于策略模式的理解：就是将原来写在一个函数中一整套功能，拆分为一个个独立的部分，从而达到解耦的目的。所以策略模式最好的应用场景，就是拆解 if-else，把每个 if 模块封装为独立算法

## 前端策略模式应用

实际上在前端开发中，通常不会使用到面向对象的模式，在前端中应用策略模式，完全可以简化为两个部分

对象：存储策略算法，并通过 key 匹配对应算法

策略方法：实现 key 对应的具体策略算法

javascript 版本的策略模式

    var strategies = {
        "S": function( salary ){
            return salary * 4;
        },
        "A": function( salary ){
            return salary * 3;
        },
        "B": function( salary ){
            return salary * 2;
        }
    };
    var calculateBonus = function( level, salary ){
        return strategies[ level ]( salary );
    };
    console.log( calculateBonus( 'S', 20000 ) ); // 输出：80000
    console.log( calculateBonus( 'A', 10000 ) ); // 输出：30000

## 总结

策略模式的优点在于：代码逻辑更清晰，每个策略对对应一个实现方法；同时遵循开闭原则，新的策略方法无需改变已有代码，所以非常适合处理或重构复杂逻辑的 if-else

在前端开发过程中，不需要遵循面向对象的应用方式，只需要通过对象存储策略算法，通过 key 匹配具体策略实现，就可以实现一个基础的策略模式

在 JavaScript 语言的策略模式中，策略类往往被函数所代替，这时策略模式就成为一种“隐形”的模式。
