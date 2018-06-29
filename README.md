---
category: Components
subtitle: 弹窗延时初始化组件
type: Data Entry
cols: 1
title: LazyDialog
---

具有延迟Dialog初始化的功能（可以通过传参数isLazy是否延迟初始化）和点击children能够打开弹窗的功能
使用示例（用于修饰类组件）
```jsx
@LazyDialog
export default class IndustrySelectorDialog extends Component {

}
```
如果不想延迟加载
```
<IndustrySelector
  isLazy
>

```
## API

### LazyDialog


| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| isLazy | 是否延迟加载  | boolean | false |
| onCheck | 打开弹窗前的检查函数  | func | 无 |

1 注意onCheck存在且onCheck() === false的时候不打开弹窗  
2 onCheck这个函数的作用是为了解除多种多样的判断和弹窗组件的耦合   
onCheck返回值如果是false不会打开弹窗,返回值如果是Promise则判断onCheckPromise是否是函数，如果是则检查起返回值，只有为false才不会打开弹窗，更详细的情况请参考代码  
3 使用注意要在被装饰的组件生命周期中
```$xslt
componentDidMount() {
  this.props.parent.dialog = this.refs.industryDialog;
}
```
