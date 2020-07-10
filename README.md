
# 1. 架构设计

1. webpack 编译打包
2. eslint 代码规范
3. sass css扩展语言
4. typescript
5. mock 数据（接口数据）
6. axios 前后端交互
7. 上传cdn
8. 制作插件并上传到npm
9. vue多页面实现
10. vuex模块化开发
11. 使用node.js搭建服务器
12. 代码测试 mocha
13. 函数式组件
14. promise async/await

## 1.1. 目录结构

## 1.2. 插件install

### 1.2.1. sass安装

```bash
cnpm install node-sass --save-dev

cnpm install sass-loader@7.3.1 --save-dev   // 最新版本会报错
```

**配置**：webpack.base.conf.js  
module -> rules  添加

```javascript
{
   test: /\.scss$/,
   loaders: ["style", "css", "sass"]
}
```

### 1.2.2. element-ui 安装

```bash
cnpm install i element-ui -S
```

**配置**：main.js

```javascript
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
```

#### 1.2.2.1. 按需引入

借助 babel-plugin-component，我们可以只引入需要的组件，以达到减小项目体积的目的。  

```bash
npm install babel-plugin-component -D
```

修改 .babelrc

```javascript
{
  "presets": [["es2015", { "modules": false }]],
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
```

main.js

```javascript
import { Button, Select } from 'element-ui';

Vue.component(Button.name, Button);
Vue.component(Select.name, Select);
/* 或写为
 * Vue.use(Button)
 * Vue.use(Select)
 */
```

### 1.2.3. vuex install

```bash
cnpm install vuex --save
```

## 常用方法

### Vue.use()

Vuex 通过 store 选项，提供了一种机制将状态从根组件“注入”到每一个子组件中（需调用 Vue.use(Vuex)  

### require()


