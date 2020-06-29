# learnvue-deep

> vue deep pratice

## 架构设计

1. webpack 编译打包
2. eslint 代码规范
3. sass css扩展语言
4. typescript
5. mock 数据（接口数据）
6. axios 前后端交互
7. 上传cdn

使用node.js搭建服务器

### sass安装

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

### element-ui 安装

```bash
cnpm install i element-ui -S
```
