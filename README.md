# dva-cli踩坑指南

## 安装脚手架 并且创建一个项目

```node
npm install dva-cli -g
dva new dva //创建一个叫dva的项目
cd dva 
npm start
```

## 依赖安装

```node
npm i antd -S
npm i  babel-plugin-import -S //按需加载组件和样式 
```

#### 配置按需加载

打开项目根目录的 `.webpackrc`  替换为以下内容

```json
{
  "extraBabelPlugins": [[
    "import", {
      "libraryName": "antd",
      "libraryDirectory": "es",
      "style": true
    }
  ]]
}
```

这样按需加载就配置完成了 

## 启动你的项目 

```node
npm start
```

不出意外的话 浏览器会报错 

```js
Warning: Please use require("history").createHashHistory instead of require("history/createHashHistory"). Support for the latter will be removed in the next major release.
```

#### 解决方案 

打开项目的 `node_modules` 文件夹 找到 `dva` 文件夹  修改 `lib/index.js` 文件夹 

找到下面这行代码 

```js
var _createHashHistory = _interopRequireDefault(require("history/createHashHistory"));
```

修改为

```js
var _createHashHistory = _interopRequireDefault(require("history").createHashHistory);
```

重启项目 就可以得到解决 

### 默认的Hash怎么变成 History模式？

打开 	`src/index.js`  修改为下面这样

```js
import dva from 'dva';
import './index.css';
import {createBrowserHistory as createHistory} from 'history'; // history模式 ----关键部分
// 1. Initialize
const app = dva({
    history: createHistory(), // history模式 ---关键部分
});

// 2. Plugins
// app.use({});

// 3. Model
//app.model(require('./models/index').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');

```

--------------

## 使用一个仓库

1.打开 `src/models`  新建一个 `index.js`  文件 写上以下内容 

```js
export default {
  namespace: 'indexPage',
  state: {
    ceshi:'测试数据666'
  },
  effects: {
  },
  reducers: {
  },
};
```

2.打开 `src/index.js`  引入到全局  修改后代码如下 

```js
import dva from 'dva';
import './index.css';
import {createBrowserHistory as createHistory} from 'history'; // history模式
// 1. Initialize
const app = dva({
    history: createHistory(), // history模式
});

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/index').default); //------关键部分

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
```

打开 `src/routes/IndexPages.js`  连接仓库 

```js
import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';

function IndexPage(props) {
  console.log(props.indexPage)
  return (
    <div className={styles.normal}>
      <h1 className={styles.title}>Yay! Welcome to dva!</h1>
      <div className={styles.welcome} />
      <ul className={styles.list}>
        <li>To get started, edit <code>src/index.js</code> and save to reload.</li>
        <li><a href="https://github.com/dvajs/dva-docs/blob/master/v1/en-us/getting-started.md">Getting Started</a></li>
      </ul>
    </div>
  );
}

IndexPage.propTypes = {
};
///关键部分
export default connect(({ indexPage }) => ({
  indexPage,
}))(IndexPage);
```

搞定

![](https://cdn.xiaohuwei.cn/ec5cc738e1ed0b778ff2e72476f36ea4)





