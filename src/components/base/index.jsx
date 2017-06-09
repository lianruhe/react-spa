// Base Component 继承自 React.Component
// 引用immutable.js的使用，重写组件的 shouldComponentUpdate，减少组件不必要的更新，优化性能
import { Component } from 'react'
import pureRender from 'utils/pure-render'

@pureRender
export default class Base extends Component {}
