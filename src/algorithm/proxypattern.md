---
# 这是文章的标题
title: 代理模式-实践
# 你可以自定义封面图片
# cover: /assets/images/cover1.jpg
# 这是页面的图标
icon: file
# 这是侧边栏的顺序
order: 1
# 设置作者
author: sunhaibo
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


## 代理模式

定义：为一个对象提供一个代用品或占位符，以便控制对它的访问


## 前端代理模式应用

### 请求代理
当发起请求时，可以代理请求在转发请求之前执行一些额外的操作，或者在转发请求之后做一些额外的操作

    // 定义目标对象接口
    class Subject {
        request() {
            // 处理请求
        }
    }
    // 定义具体目标对象类
    class RealSubject extends Subject {
        request() {
            // 处理真实请求
        }
    }
    // 定义代理对象类
    class Proxy extends Subject {
        constructor() {
            super();
            this.realSubject = new RealSubject();
        }
        request() {
            // 在转发请求之前或之后执行一些额外操作
            this.preRequest();
            this.realSubject.request();
            this.postRequest();
        }
        preRequest() {
            // 在转发请求之前执行一些额外操作
        }
        postRequest() {
            // 在转发请求之后执行一些额外操作
        }
    }
    // 使用示例
    const proxy = new Proxy();
    proxy.request(); // 通过代理对象发送请求，并在转发前后执行额外操作
    
### 图片懒加载
当页面中存在大量图片时，为了提高页面加载速度和性能，可以使用图片懒加载技术。在这种情况下，可以使用代理模式，在图片未进入可视区域之前，使用占位图或者小图进行替换，在图片进入可视区域时再加载真实图片。

    // 定义目标对象
    class ImageLoader {
        constructor(imageElement) {
            this.imageElement = imageElement;
            this.realImage = new Image();
            this.realImage.onload = () => {
            this.imageElement.src = this.realImage.src;
            };
        }
        load() {
            // 模拟从服务器加载真实图片的操作
            console.log("Loading real image...");
            this.realImage.src = this.imageElement.dataset.src;
        }
    }
    // 定义图片懒加载代理对象
    class LazyImageProxy {
        constructor(imageElement) {
            this.imageElement = imageElement;
        }
        load() {
            if (this.imageElement.getBoundingClientRect().top < window.innerHeight) {
            const imageLoader = new ImageLoader(this.imageElement);
            imageLoader.load();
            }
        }
    }
    // 使用示例
    const lazyImages = document.querySelectorAll(".lazy-image");
    lazyImages.forEach((image) => {
        const lazyImageProxy = new LazyImageProxy(image);
        lazyImageProxy.load();
    });
    
通过使用代理模式实现图片懒加载，可以减少页面加载时对大量图片的请求，提高页面加载速度和性能。同时，代理对象还可以隐藏目标对象的具体实现细节，保护目标对象的安全性。

### 数据缓存代理
为了减少网络请求和提高页面加载速度，可以使用代理模式在客户端或服务端缓存数据。当客户端请求数据时，代理对象首先检查缓存中是否存在数据，如果存在则直接返回缓存数据，否则再向目标对象请求数据并将其缓存起来。

    // 定义目标对象
    class DataService {
    fetchData(key) {
        // 模拟从服务器获取数据的操作
        console.log("Fetching data from server...");
        return `Data for ${key}`;
    }
    }
    // 定义数据缓存代理对象
    class DataCacheProxy {
    constructor() {
        this.cache = {};
        this.dataService = new DataService();
    }
    fetchData(key) {
        if (this.cache[key]) {
        console.log("Fetching data from cache...");
        return this.cache[key];
        } else {
        const data = this.dataService.fetchData(key);
        this.cache[key] = data;
        return data;
        }
    }
    }
    // 使用示例
    const proxy = new DataCacheProxy();
    console.log(proxy.fetchData("example")); // 从服务器获取数据，并缓存起来
    console.log(proxy.fetchData("example")); // 从缓存中获取数据
    
通过使用代理模式实现数据缓存代理，可以减少对服务器的请求次数，提高数据访问的性能和效率。同时，代理对象还可以隐藏目标对象的具体实现细节，保护目标对象的安全性。

### ES6的Proxy
S6引入了Proxy对象，它是一种代理模式的实现，用于拦截并自定义对象的操作。Proxy对象可以拦截并重定义JavaScript对象的底层操作，例如属性访问、赋值、函数调用等。通过使用Proxy对象，我们可以在目标对象上添加额外的行为或修改默认行为。

    const proxy = new Proxy(target, handler);

- target：要代理的目标对象。
- handler：一个包含各种拦截操作的处理程序对象。

下面是一些常见的Proxy拦截操作：

1.get(target, property, receiver)：拦截对目标对象属性的读取操作。
2.set(target, property, value, receiver)：拦截对目标对象属性的赋值操作。
3.apply(target, thisArg, argumentsList)：拦截对目标函数的调用操作。
4.has(target, property)：拦截in运算符判断属性是否存在于目标对象中。
5.deleteProperty(target, property)：拦截对目标对象属性的删除操作。

    const user = {
    name: "John",
    isAdmin: false,
    };
    
    const userProxy = new Proxy(user, {
    get(target, property) {
        if (property === "isAdmin") {
        return false; // 拒绝访问isAdmin属性
        }
        return target[property];
    },
    set(target, property, value) {
        if (property === "isAdmin") {
        throw new Error("Cannot modify isAdmin property.");
        }
        target[property] = value;
        return true;
    },
    });
    
    console.log(userProxy.name); // 输出: "John"
    console.log(userProxy.isAdmin); // 输出: false
    userProxy.isAdmin = true; // 抛出错误: "Cannot modify isAdmin property."
    
ES6 Proxy提供了强大的拦截能力，可以用于实现数据校验、权限控制、数据劫持等功能。然而，需要注意使用Proxy时要考虑性能问题，因为每个操作都会经过拦截处理。

## 总结

优缺点
- 优点

1.代理模式可以实现对目标对象的访问控制，可以在不改变目标对象的情况下增加额外的功能。
2.通过使用代理模式，可以实现客户端与目标对象之间的解耦，提高代码的可维护性和可扩展性。
3.代理模式可以隐藏目标对象的具体实现细节，保护目标对象的安全性。
- 缺点

1.代理模式增加了系统的复杂性，引入了额外的代理对象。
2.在一些情况下，代理模式可能会导致请求的延迟，因为请求需要经过代理对象转发。

代理模式是一种常用的设计模式，它通过创建一个代理对象来控制对另一个对象的访问。通过使用代理模式，可以实现对目标对象的访问控制、增加额外功能、解耦客户端与目标对象等。然而，需要根据具体情况权衡使用代理模式所带来的优缺点。

