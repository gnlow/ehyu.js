# ehyu.js
Hangul jamo replacer
```js
var text = new ehyu.Gljas("안녕, 새로운 세상");
text.replace("ㅔ", "ㅐ", {lock: true})
    .replace("ㅐ", "ㅔ");
console.log(text.content);
// 안녕, 세로운 새상
```
## Installation
### NPM
```bash
npm install ehyu
```
```js
const ehyu = require("ehyu");
```
### CDN
```html
<script src="https://unpkg.com/browse/ehyu/dist/ehyu.umd.js"></script>
```
## How To Use
```js
var text = new ehyu.Gljas("바꿀 글");
```
### Simple Replace
```js
text.replace("ㄱ", "ㄴ");
//바꿀 늘
```
### Option
```js
text.replace("ㄱ", "ㄴ",{
    target: "coda", 
    // "onset"(초성), "nucleus"(중성), "coda"(종성)
    // 설정 시 해당하는 자모만 변경
    lock: true 
    // 기본값: false
    // true로 설정 시 변경된 자모는 다시 바뀌지 않음
});
```