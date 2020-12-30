## uus

> 一个简单易用的 url search 操作工具

## Install

```bash
npm install uus
```

## Quick Start

```js
import us from 'uus';

// 假设当前页面地址为：https://www.baidu.com/?a=1&b=2#/login
us.get('a'); // 1

us.parse(); // { orgin: 'https://www.baidu.com/', search: '?a=1&b=2', hash: '#/login' }
us.parse('https://www.qq.com/?x=10#/register'); // { orgin: 'https://www.qq.com/', search: '?x=10', hash: '#/register' }

us.trim('?a=1&b=2&&'); // a=1&b=2

us.concat('c=3'); // https://www.baidu.com/?a=1&b=2&c=3#/login
us.concat({ c: 3 }); // https://www.baidu.com/?a=1&b=2&c=3#/login
us.concat({ c: 3 }, 'https://www.qq.com/?x=10#/register'); // https://www.qq.com/?x=10&c=3#/register

us.ofObject(); // { a: 1, b: 2 }
us.ofString({ a: 1, b: 2 }); // a=1&b=2
```