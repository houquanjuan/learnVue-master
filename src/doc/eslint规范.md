# ESLint

ESLint是在ECMAScript/JavaScript代码中识别和报告模式匹配的工具，它的目标是保证代码的一致性和避免错误。它和JSLint、JSHint相似，除了少数例外：

* ESLint 使用 Espress 解析 Javascript
* ESLint 使用AST去分析代码中的模式
* 完全插件化。每一个规则都是一个插件并且可以在运行时添加更多的规则。

## 命令行

### 安装

`npm i -g eslint`  

### 运行

`eslint [options] [file|dir|glob]*`  
`例如：eslint file1.js file2.js`  

## 配置

ESlint 被设计为完全可配置的，这意味着你可以关闭每一个规则而只运行基本语法验证，或混合和匹配 ESLint 默认绑定的规则和你的自定义规则，以让 ESLint 更适合你的项目。有两种主要的方式来配置 ESLint：

1. **Configuration Comments** - 使用 JavaScript 注释把配置信息直接嵌入到一个代码源文件中。
2. **Configuration Files** - 使用 JavaScript、JSON 或者 YAML 文件为整个目录（处理你的主目录）和它的子目录指定配置信息。可以配置一个独立的 .eslintrc.* 文件，或者直接在 package.json 文件里的 eslintConfig 字段指定配置，ESLint 会查找和自动读取它们，再者，你可以在命令行运行时指定一个任意的配置文件。

### Environments

指定脚本的运行环境。每种环境都有一组特定的预定义全局变量。

* browser - 浏览器环境中的全局变量。
* node - Node.js 全局变量和 Node.js 作用域。
* commonjs - CommonJS 全局变量和 CommonJS 作用域 (用于 Browserify/WebPack 打包的只在浏览器中运行的代码)。
* shared-node-browser - Node.js 和 Browser 通用全局变量。
* es6 - 启用除了 modules 以外的所有 ECMAScript 6 特性（该选项会自动设置 ecmaVersion 解析器选项为 6）。
* worker - Web Workers 全局变量。
* amd - 将 require() 和 define() 定义为像 amd 一样的全局变量。
* mocha - 添加所有的 Mocha 测试全局变量。
* jasmine - 添加所有的 Jasmine 版本 1.3 和 2.0 的测试全局变量。
* jest - Jest 全局变量。
* jest - Jest 全局变量。
* jest - Jest 全局变量。
* phantomjs - PhantomJS 全局变量。
* protractor - Protractor 全局变量。
* qunit - QUnit 全局变量。
* jquery - jQuery 全局变量。
* shelljs - ShellJS 全局变量。
* meteor - Meteor 全局变量。
* mongo - MongoDB 全局变量。
* applescript - AppleScript 全局变量。
* nashorn - Java 8 Nashorn 全局变量。
* serviceworker - Service Worker 全局变量。
* atomtest - Atom 测试全局变量。
* embertest - Ember 测试全局变量。
* webextensions - WebExtensions 全局变量。
* greasemonkey - GreaseMonkey 全局变量。

这些环境并不是互斥的，所以你可以同时定义多个。可以在源文件里、在配置文件中或使用 命令行 的 --env 选项来指定环境。  
要在你的 JavaScript 文件中使用注释来指定环境，格式如下：  

 ` /* eslint-env node, mocha */ `  
 该设置启用了 Node.js 和 Mocha 环境 。

要在配置文件里指定环境，使用 env 关键字指定你想启用的环境，并设置它们为 true。例如，以下示例启用了 browser 和 Node.js 的环境：

```javascript
{
    "env": {
        "browser": true,
        "node": true
    }
}

或在 package.json 文件中：
{
    "name": "mypackage",
    "version": "0.0.1",
    "eslintConfig": {
        "env": {
            "browser": true,
            "node": true
        }
    }
}
```

### Globals

脚本在执行期间访问的额外的全局变量。如果你想在一个源文件里使用全局变量，推荐你在 ESLint 中定义这些全局变量，这样 ESLint 就不会发出警告了。你可以使用注释或在配置文件中定义全局变量。  

要在你的 JavaScript 文件中，用注释指定全局变量，格式如下：  
` /* global var1, var2 */ `  
这定义了两个全局变量，var1 和 var2。如果你想选择性地指定这些全局变量可以被写入(而不是只被读取)，那么你可以用一个 "writable" 的标志来设置它们:  
` /* global var1:writable, var2:writable */ `  

要在配置文件中配置全局变量，请将 globals 配置属性设置为一个对象，该对象包含以你希望使用的每个全局变量。对于每个全局变量键，将对应的值设置为 "writable" 以允许重写变量，或 "readonly" 不允许重写变量。例如：

```javascript
{
    "globals": {
        "var1": "writable",
        "var2": "readonly"
    }
}
```

可以使用字符串 "off" 禁用全局变量。例如，在大多数 ES2015 全局变量可用但 Promise 不可用的环境中，你可以使用以下配置:

```javascript
{
    "env": {
        "es6": true
    },
    "globals": {
        "Promise": "off"
    }
}
```

由于历史原因，布尔值 false 和字符串值 "readable" 等价于 "readonly"。类似地，布尔值 true 和字符串值 "writeable" 等价于 "writable"。但是，不建议使用旧值。

### Rules

启用的规则及其各自的错误级别。  

ESLint 附带有大量的规则。你可以使用注释或配置文件修改你项目中要使用的规则。要改变一个规则设置，你必须将规则 ID 设置为下列值之一：

* "off" 或 0 - 关闭规则  
* "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)  
* "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)

1. 文件注释里配置规则  
` /* eslint eqeqeq: "off", curly: "error" */ `

2. 配置文件中配置

```javascript
{
    "rules": {
        "eqeqeq": "off",
        "curly": "error",
        "quotes": ["error", "double"],
        "plugin1/rule1": "error" // 配置定义在插件中的一个规则的时候，你必须使用 插件名/规则ID的形式
    }
}
````

#### 规则

|    名称      |    描述      |
|   -----  |     ----      |
| for-direction | 强制 “for” 循环中更新子句的计数器朝着正确的方向移动 |  
| getter-return | 强制 getter 函数中出现 return 语句 |
| no-async-promise-executor | 禁止使用异步函数作为 Promise executor |
| no-await-in-loop | 禁止在循环中出现 await |
| no-compare-neg-zero | 禁止与 -0 进行比较 |
| no-cond-assign | 禁止条件表达式中出现赋值操作符 |
| no-console | 禁用 console |
| no-constant-condition | 禁止在条件中使用常量表达式|
| no-control-regex | 禁止在正则表达式中使用控制字符|
| no-debugger | 禁用 debugger |
| no-dupe-args | 禁止 function 定义中出现重名参数 |
| no-dupe-keys | 禁止对象字面量中出现重复的 key |
| no-duplicate-case | 禁止出现重复的 case 标签 |
| no-empty | 禁止出现空语句块 |
| no-empty-character-class | 禁止在正则表达式中使用空字符集 |
| no-ex-assign | 禁止对 catch 子句的参数重新赋值 |
| no-extra-boolean-cast | 禁止不必要的布尔转换 |
| no-extra-parens | 禁止不必要的括号 |
| no-extra-semi | 禁止不必要的分号 |
| no-func-assign | 禁止对 function 声明重新赋值 |
| no-inner-declarations | 禁止在嵌套的块中出现变量声明或 function 声明 |
| no-invalid-regexp | 禁止 RegExp 构造函数中存在无效的正则表达式字符串 |
| no-irregular-whitespace | 禁止不规则的空白 |
| no-misleading-character-class | 不允许在字符类语法中出现由多个代码点组成 的字符 |
| no-obj-calls | 禁止把全局对象作为函数调用 |
| no-prototype-builtins | 禁止直接调用 Object.prototypes 的内置属性 |
| no-regex-spaces | 禁止正则表达式字面量中出现多个空格 |
| no-sparse-arrays | 禁用稀疏数组 |
| no-template-curly-in-string | 禁止在常规字符串中出现模板字面量占位符语法 |
| no-unexpected-multiline | 禁止出现令人困惑的多行表达式 |
| no-unreachable | 禁止在 return、throw、continue 和 break 语句之后出现不可达代码 |
| no-unsafe-finally | 禁止在 finally 语句块中出现控制流语句 |
| no-unsafe-negation | 禁止对关系运算符的左操作数使用否定操作符 |
| require-atomic-updates | 禁止由于 await 或 yield的使用而可能导致出现竞态条件的赋值 |
| use-isnan | 要求使用 isNaN() 检查 NaN |
| valid-typeof | 强制 typeof 表达式与有效的字符串进行比较 |

[更多规则](http://eslint.cn/docs/rules/)

#### 规则禁用/启用

1、文件中使用块注释来临时禁止规则出现警告

```javascript
/* eslint-disable */

alert('foo');

/* eslint-enable */
```

2、对指定的规则启用或禁用警告

```javascript
/* eslint-disable no-alert, no-console */

alert('foo');
console.log('bar');

/* eslint-enable no-alert, no-console */
```

3、如果在整个文件范围内禁止规则出现警告，将 /* eslint-disable */ 块注释放在文件顶部  

```javascript
/* eslint-disable */

alert('foo');

 可以对整个文件启用或禁用警告:

/* eslint-disable no-alert */

// Disables no-alert for the rest of the file
alert('foo');

可以在你的文件中使用以下格式的行注释或块注释在某一特定的行上禁用所有规则：

alert('foo'); // eslint-disable-line

// eslint-disable-next-line
alert('foo');

/* eslint-disable-next-line */
alert('foo');

alert('foo'); /* eslint-disable-line */

在某一特定的行上禁用某个指定的规则：

alert('foo'); // eslint-disable-line no-alert

// eslint-disable-next-line no-alert
alert('foo');

alert('foo'); /* eslint-disable-line no-alert */

/* eslint-disable-next-line no-alert */
alert('foo');


在某个特定的行上禁用多个规则：

alert('foo'); // eslint-disable-line no-alert, quotes, semi

// eslint-disable-next-line no-alert, quotes, semi
alert('foo');

alert('foo'); /* eslint-disable-line no-alert, quotes, semi */

/* eslint-disable-next-line no-alert, quotes, semi */
alert('foo');
````

若要禁用一组文件的配置文件中的规则，请使用 overrides 和 files。例如:

```javascript
{
  "rules": {...},
  "overrides": [
    {
      "files": ["*-test.js","*.spec.js"],
      "rules": {
        "no-unused-expressions": "off"
      }
    }
  ]
}
```

### Plugins

ESLint 支持使用第三方插件。在使用插件之前，你必须使用 npm 安装它。

在配置文件里配置插件时，可以使用 plugins 关键字来存放插件名字的列表。插件名称可以省略 eslint-plugin- 前缀。

```javascript
{
    "plugins": [
        "plugin1",
        "eslint-plugin-plugin2"
    ]
}
```

参考：[ESLint官网](http://eslint.cn/docs/user-guide/getting-started)