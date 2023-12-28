import{_ as n}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as e,c as o,e as r,f as a}from"./app-MZgkb8r2.js";const t={},i=a(`<h2 id="发布—订阅模式" tabindex="-1"><a class="header-anchor" href="#发布—订阅模式" aria-hidden="true">#</a> 发布—订阅模式</h2><p>定义：是一种只需使用继承就可以实现的非常简单的模式</p><p>模板方法模式由两部分结构组成，第一部分是抽象父类，第二部分是具体的实现子类。通常 在抽象父类中封装了子类的算法框架，包括实现一些公共方法以及封装子类中所有方法的执行顺 序。子类通过继承这个抽象类，也继承了整个算法结构，并且可以选择重写父类的方法。</p><h2 id="前端发布—订阅模式应用" tabindex="-1"><a class="header-anchor" href="#前端发布—订阅模式应用" aria-hidden="true">#</a> 前端发布—订阅模式应用</h2><pre><code>var Beverage = function( param ){
    var boilWater = function(){
        console.log( &#39;把水煮沸&#39; );
    };
    var brew = param.brew || function(){
        throw new Error( &#39;必须传递 brew 方法&#39; );
    };
    var pourInCup = param.pourInCup || function(){
        throw new Error( &#39;必须传递 pourInCup 方法&#39; );
    };
    var addCondiments = param.addCondiments || function(){
        throw new Error( &#39;必须传递 addCondiments 方法&#39; );
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
        console.log( &#39;用沸水冲泡咖啡&#39; ); 
    }, 
    pourInCup: function(){ 
        console.log( &#39;把咖啡倒进杯子&#39; ); 
    }, 
    addCondiments: function(){ 
        console.log( &#39;加糖和牛奶&#39; ); 
    } 
});
var Tea = Beverage({ 
    brew: function(){ 
        console.log( &#39;用沸水浸泡茶叶&#39; ); 
    }, 
    pourInCup: function(){ 
        console.log( &#39;把茶倒进杯子&#39; ); 
    }, 
    addCondiments: function(){ 
        console.log( &#39;加柠檬&#39; ); 
    } 
}); 
var coffee = new Coffee(); 
coffee.init(); 
var tea = new Tea(); 
tea.init();
</code></pre><p>在这段代码中，我们把 brew、pourInCup、addCondiments 这些方法依次传入 Beverage 函数， Beverage 函数被调用之后返回构造器 F。F 类中包含了“模板方法”F.prototype.init。跟继承得 到的效果一样，该“模板方法”里依然封装了饮料子类的算法框架。</p><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>模板方法模式是一种典型的通过封装变化提高系统扩展性的设计模式。在传统的面向对象语 言中，一个运用了模板方法模式的程序中，子类的方法种类和执行顺序都是不变的，所以我们把 这部分逻辑抽象到父类的模板方法里面。而子类的方法具体怎么实现则是可变的，于是我们把这 部分变化的逻辑封装到子类中。通过增加新的子类，我们便能给系统增加新的功能，并不需要改 动抽象父类以及其他子类，这也是符合开放封闭原则的。 但在 JavaScript 中，我们很多时候都不需要依样画瓢地去实现一个模版方法模式，高阶函数 是更好的选择。</p>`,8);function c(d,p){return e(),o("div",null,[r(" more "),i])}const s=n(t,[["render",c],["__file","templatepattern.html.vue"]]);export{s as default};
