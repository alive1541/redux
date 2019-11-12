# redux
redux概念及其实现


# 概念
### 三大原则
- 单一数据源
- State 是只读的
- 使用纯函数来执行修改
### 数据流
<img src="https://user-gold-cdn.xitu.io/2019/3/24/169ad99e277502d0?imageView2/0/w/1280/h/960/format/webp/ignore-error/1"/>

# flux && redux

redux是flux的一种实现，参考https://juejin.im/post/5c9893c56fb9a07107193ddb

### 差异
- Redux并没有 dispatcher
- Redux为不可变数据集
- Redux有且只有一个Store对象(单仓库)

# 基础用法
示例：
https://www.redux.org.cn/docs/basics/ExampleTodoList.html

# 高级用法

### combineReducers
把一个由多个不同 reducer 函数作为 value 的 object，合并成一个最终的 reducer 函数。
specifically abstracts the process of delegating work to other reducer functions based on slices of state。（专门用来抽象派发工作给其他reducer————基于“状态切片”的过程。）

示例：
``````
// reducers.js
export default theDefaultReducer = (state = 0, action) => state;

export const firstNamedReducer = (state = 1, action) => state;

export const secondNamedReducer = (state = 2, action) => state;


// rootReducer.js
import {combineReducers, createStore} from "redux";

import theDefaultReducer, {firstNamedReducer, secondNamedReducer} from "./reducers";


// 使用 ES6 的对象字面量简写方式定义对象结构
const rootReducer = combineReducers({
    theDefaultReducer,
    firstNamedReducer,
    secondNamedReducer
});

const store = createStore(rootReducer);
console.log(store.getState());
// {theDefaultReducer : 0, firstNamedReducer : 1, secondNamedReducer : 2}
``````

高阶reducer：

``````
function createCounterWithNamedType(counterName = '') {
    return function counter(state = 0, action) {
        switch (action.type) {
            case `INCREMENT_${counterName}`:
                return state + 1;
            case `DECREMENT_${counterName}`:
                return state - 1;
            default:
                return state;
        }
    }
}
const rootReducer = combineReducers({
    counterA : createCounterWithNamedType('A'),
    counterB : createCounterWithNamedType('B'),
    counterC : createCounterWithNamedType('C'),
});

store.dispatch({type : 'INCREMENT_B'});
console.log(store.getState());
// {counterA : 0, counterB : 1, counterC : 0}
``````



### Middleware
它提供的是位于 action 被发起之后，到达 reducer 之前的扩展点。
示例： 
``````
const logger = store => next => action => {
  console.group(action.type)
  console.info('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  console.groupEnd(action.type)
  return result
}


``````





