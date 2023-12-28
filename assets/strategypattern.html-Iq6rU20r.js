import{_ as e}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as a,c as r,e as t,f as n}from"./app-5nKnpmdb.js";const o={},s=n(`<h2 id="策略模式" tabindex="-1"><a class="header-anchor" href="#策略模式" aria-hidden="true">#</a> 策略模式</h2><p>定义：定义了一系列的算法，并将每个算法封装起来，使它们可以互相替换</p><p>对于策略模式的理解：就是将原来写在一个函数中一整套功能，拆分为一个个独立的部分，从而达到解耦的目的。所以策略模式最好的应用场景，就是拆解 if-else，把每个 if 模块封装为独立算法</p><h2 id="前端策略模式应用" tabindex="-1"><a class="header-anchor" href="#前端策略模式应用" aria-hidden="true">#</a> 前端策略模式应用</h2><p>实际上在前端开发中，通常不会使用到面向对象的模式，在前端中应用策略模式，完全可以简化为两个部分</p><p>对象：存储策略算法，并通过 key 匹配对应算法</p><p>策略方法：实现 key 对应的具体策略算法</p><p>javascript 版本的策略模式</p><pre><code>var strategies = {
    &quot;S&quot;: function( salary ){
        return salary * 4;
    },
    &quot;A&quot;: function( salary ){
        return salary * 3;
    },
    &quot;B&quot;: function( salary ){
        return salary * 2;
    }
};
var calculateBonus = function( level, salary ){
    return strategies[ level ]( salary );
};
console.log( calculateBonus( &#39;S&#39;, 20000 ) ); // 输出：80000
console.log( calculateBonus( &#39;A&#39;, 10000 ) ); // 输出：30000
</code></pre><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>策略模式的优点在于：代码逻辑更清晰，每个策略对对应一个实现方法；同时遵循开闭原则，新的策略方法无需改变已有代码，所以非常适合处理或重构复杂逻辑的 if-else</p><p>在前端开发过程中，不需要遵循面向对象的应用方式，只需要通过对象存储策略算法，通过 key 匹配具体策略实现，就可以实现一个基础的策略模式</p><p>在 JavaScript 语言的策略模式中，策略类往往被函数所代替，这时策略模式就成为一种“隐形”的模式。</p>`,13);function c(l,i){return a(),r("div",null,[t(" more "),s])}const d=e(o,[["render",c],["__file","strategypattern.html.vue"]]);export{d as default};
