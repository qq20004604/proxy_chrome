# proxy_chrome

chrome浏览器代理。

<h1>proxy说明</h1>

<h3>功能描述：</h3>

<ol>
    <li>
        <b>自动重定向：</b>原访问 <i>www.a.com/index.html</i>，现访问<i>www.b.com/index.html</i>
    </li>
    <li>
        <b>内外网切换：</b>访问 <i>www.a.com/index.html</i> 时，加载的资源是<i>www.a.com/vendor.js</i>（默认是外网资源），配置后加载的资源是 <i>123.123.123.123/vendor.js</i>（变为访问内网资源）
    </li>
</ol>

<h3>配置说明：</h3>

<ol>
    <li>
        <b>原始路径：</b>假如用户访问 <i>http://www.a.com/a.html</i>，该网址加载资源 <i>http://www.a.com/b.css</i>，那么 <i>http://www.a.com/a.html</i>
        和 <i>http://www.a.com/b.css</i> 都是原始路径；
    </li>
    <li>
        <b>路径匹配：</b>同样以以上为例，<i>http://www.a.com/a.html</i> 和 <i>http://www.a.com/b.css</i>
        分别触发一次匹配逻辑，二次匹配不相关。准确的说，每一次http请求都会触发匹配；
    </li>
    <li>
        <b>第一列：</b>在原始路径中查找这一列内容，如果找到，则认为第一列匹配成功；
    </li>
    <li>
        <b>第二列：</b>当第一列和第三列匹配成功后，第一列的内容，将被第二列填写的内容所替代；
    </li>
    <li>
        <b>第三列：</b>选填，以正则语法填写（但不带两边的斜杠）。若不为空，将以正则形式匹配原始路径，返回值为true，则认为匹配成功；
    </li>
    <li>
        <b>生效与失效：</b>见第四列。第一列若为空，则不生效（不触发匹配）；
    </li>
    <li>
        <b>配置触发规则：</b>第一列必须匹配成功，第三列如果填写，则也需要匹配成功；失效行不会触发匹配；
    </li>
    <li>
        <b>匹配成功效果：</b>原始路径中，第一列内容将被replace为第二列内容；（只 replace 一次）
    </li>
    <li>
        <b>匹配顺序：</b>按照配置内容，从上到下依次匹配；
    </li>
    <li>
        <b>开启、关闭：</b>只有开启、关闭、保存的时候，才会更新配置。例如开启后，更改代理配置，此时不会生效，只有点击保存（或关闭再开启）后，新的配置才会生效。
    </li>
</ol>

<h3>保存与读取说明：</h3>

<ol>
    <li>
        <b>保存原则：</b>只有生效的内容将会被保存；
    </li>
    <li>
        <b>读取原则：</b>每次打开配置页面，将读取配置内容；
    </li>
</ol>
