# appDown

手机客户端下载展示页 (PC)
> 最近在项目中有一个单一的app下载展示页，特意把demo放上来，其中包括了一些动画效果。

### 兼容性
所有主流浏览器 IE7+
（低版本浏览器普通展示）


### 依赖库
> * animate.css
> * jquery

### 实现的动画
- 屏幕滚动视觉差
- css3 animation 动画

### CSS文件
样式文件采用sass的写法，导入部分有用到的animate.css，使用预编译，样式文件更好管理

### JavaScript文件
简单的屏幕滚动视觉差组件，下面展示一些配置项，欢迎完善
```
Plugin.prototype = {
        globals: {
            pluginName: "fadeThis", //插件名字
            bufferTime: 300 //延迟时间
        },
        defaults: {
            //class名字 选项有（slide-left slide-top slide right slide-bottom）
            baseName: "slide-", 
            speed: 500,
            easing: "swing",
            offset: 0,
            reverse: true,
            distance: 50,
            scrolledIn: null,
            scrolledOut: null,
            afterLoad: null
        }
}
```



