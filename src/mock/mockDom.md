## 特点

1. 前后端分离  
   让前端攻城师独立于后端进行开发。
2. 增加单元测试的真实性  
   通过随机数据，模拟各种场景。
3. 开发无侵入  
   不需要修改既有代码，就可以拦截 Ajax 请求，返回模拟的响应数据。
4. 用法简单  
   符合直觉的接口。
5. 数据类型丰富  
   支持生成随机的文本、数字、布尔值、日期、邮箱、链接、图片、颜色等。
6. 方便扩展  
   支持支持扩展更多数据类型，支持自定义函数和正则。

## 语法规范

### 数据模板定义规范

```javascript
// 属性名   name
// 生成规则 rule
// 属性值   value
'name|rule': value
```

```javascript
属性名 和 生成规则 之间用竖线 | 分隔。
生成规则 是可选的。
生成规则 有 7 种格式：
'name|min-max': value
'name|count': value
'name|min-max.dmin-dmax': value
'name|min-max.dcount': value
'name|count.dmin-dmax': value
'name|count.dcount': value
'name|+step': value
生成规则 的 含义 需要依赖 属性值的类型 才能确定。
属性值 中可以含有 @占位符。
属性值 还指定了最终值的初始值和类型。
```

**生成规则和示例**：

#### 1. 属性值是字符串 String

` 'name|min-max': string `

通过重复 string 生成一个字符串，重复次数大于等于 min，小于等于 max。

` 'name|count': string `

通过重复 string 生成一个字符串，重复次数等于 count

#### 2. 属性值是数字 Number

` 'name|+1': number `

属性值自动加 1，初始值为 number。

` 'name|min-max': number `

生成一个大于等于 min、小于等于 max 的整数，属性值 number 只是用来确定类型。

` 'name|min-max.dmin-dmax': number `

生成一个浮点数，整数部分大于等于 min、小于等于 max，小数部分保留 dmin 到 dmax 位。

```javascript
Mock.mock({
    'number1|1-100.1-10': 1,
    'number2|123.1-10': 1,
    'number3|123.3': 1,
    'number4|123.10': 1.123
})
// =>
{
    "number1": 12.92,
    "number2": 123.51,
    "number3": 123.777,
    "number4": 123.1231091814
}
```

#### 3. 属性值是布尔型 Boolean

` 'name|1': boolean `

随机生成一个布尔值，值为 true 的概率是 1/2，值为 false 的概率同样是 1/2。

` 'name|min-max': value `

随机生成一个布尔值，值为 value 的概率是 min / (min + max)，值为 !value 的概率是 max / (min + max)。

#### 4. 属性值是对象 Object

` 'name|count': object `

从属性值 object 中随机选取 count 个属性。

` 'name|min-max': object `

从属性值 object 中随机选取 min 到 max 个属性。

#### 5. 属性值是数组 Array

` 'name|1': array `

从属性值 array 中随机选取 1 个元素，作为最终值。

` 'name|+1': array `

从属性值 array 中顺序选取 1 个元素，作为最终值。

` 'name|min-max': array `

通过重复属性值 array 生成一个新数组，重复次数大于等于 min，小于等于 max。

` 'name|count': array `

通过重复属性值 array 生成一个新数组，重复次数为 count。

#### 6. 属性值是函数 Function

` 'name': function `

执行函数 function，取其返回值作为最终的属性值，函数的上下文为属性 'name' 所在的对象。

#### 7. 属性值是正则表达式 RegExp

` 'name': regexp `

根据正则表达式 regexp 反向生成可以匹配它的字符串。用于生成自定义格式的字符串。

```javascript
Mock.mock({
    'regexp1': /[a-z][A-Z][0-9]/,
    'regexp2': /\w\W\s\S\d\D/,
    'regexp3': /\d{5,10}/
})
// =>
{
    "regexp1": "pJ7",
    "regexp2": "F)\fp1G",
    "regexp3": "561659409"
}
```

### 数据占位符定义规范

占位符 只是在属性值字符串中占个位置，并不出现在最终的属性值中。

**占位符 的格式为：**

```javascript
@占位符
@占位符(参数 [, 参数])
```

**注意：**

>用 @ 来标识其后的字符串是 占位符。  
占位符 引用的是 Mock.Random 中的方法。  
通过 Mock.Random.extend() 来扩展自定义占位符。  
占位符 也可以引用 数据模板 中的属性。  
占位符 会优先引用 数据模板 中的属性。  
占位符 支持 相对路径 和 绝对路径。  

```javascript
Mock.mock({
    name: {
        first: '@FIRST',
        middle: '@FIRST',
        last: '@LAST',
        full: '@first @middle @last'
    }
})
// =>
{
    "name": {
        "first": "Charles",
        "middle": "Brenda",
        "last": "Lopez",
        "full": "Charles Brenda Lopez"
    }
}
```

## Mock.mock()

> Mock.mock( rurl?, rtype?, template|function( options ) )  
根据数据模板生成模拟数据。

* **rurl:** 可选。表示需要拦截的 URL，可以是 URL 字符串或 URL 正则。例如 /\/domain\/list\.json/、'/domian/list.json'。
* **rtype:** 可选。表示需要拦截的 Ajax 请求类型。例如 GET、POST、PUT、DELETE 等  
* **template:** 可选。表示数据模板，可以是对象或字符串。例如 { 'data|1-10':[{}] }、'@EMAIL'。  
* **function(options):** 可选。表示用于生成响应数据的函数。
**options** 指向本次请求的 Ajax 选项集，含有 url、type 和 body 三个属性
