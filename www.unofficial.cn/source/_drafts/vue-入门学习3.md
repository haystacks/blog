---
title: vue 入门学习3
date: 2016-12-13 11:00:21
categories: 
- 学习
tags:
- vue
---

按照文档学习的思路继续进行中，本文是学习如何在数据的删除、新增、更新使用动画切换效果。
<!-- more -->
### 过渡效果
> Vue 在插入、更新或者移除 DOM 时，提供多种不同方式的应用过渡效果。

#### 单元素/组件的过渡
vue封装了一个 `transition` 组件，源码中的平台组件，在一些情形中给元素和组件添加entering/leaving过渡。  
- 条件渲染（v-if）
- 条件展示（v-show)
- 动态组件
- 组件根节点

一个例子：[demo](/demo/hystack/20161213/vue.html)  
这个例子中的 toggle 会有一个插入元素与删除元素的动作，会在合适的时候给元素添加css类名，并且自动嗅探目标元素是否有css过渡或动画。如果过渡组件还有js钩子函数，会在适应的阶段调用钩子函数。如果没有找到js钩子与css过渡、动画。dom操作会立即执行。

* 过渡的css类名 - css过渡
enter/leave中存在四个状态，v-enter(准备进入), v-enter-active(进入过程中的过渡状态), v-leave(准备离开), v-leave-active(离开过程中的过渡状态)
 - v-enter:定义元素进入过渡的开始状态，在元素插入时生效，下一帧移除
 - v-enter-active:定义元素进入过渡的结束状态，在元素被插入时生效，在transition/animation完成之后移除
 - v-leave：定义元素离开时的开始状态，在离开过渡时生效，在下一个帧移除
 - v-leave-active：定义元素离开过渡的结束状态，在离开过渡被触发时生效，在transition/animation完成之后移除

`v-`是前缀，和上面的例子对应起来，`v-`就是上面的`fade-`。  


* css动画
css动画也是使用类名来实现的，只是不是使用的css中的过渡变化的样式来实现，而是使用的animation动画来实现组件元素的过渡
一个例子：[demo](/demo/hystack/20161213/vue.html)  

* 自定义过渡类名
自定义类名的优先级高于普通的类名，方便直接使用动画库动画  
- enter-class
- enter-active-class
- leave-class
- leave-active-class
一个组件同时存在自定义过渡类名元素与过渡的name为前缀的类名同时存在的时候，自定义类名的优先级更高。  

* 同时使用Transition 和 Animation
在例子中我同时使用了transition和animation的时候，元素可以设定type属性类默认一种动画优先方式
一个例子：[demo](/demo/hystack/20161213/vue.html)  

* js钩子

```
var platformComponents = {
    Transition: Transition,
    TransitionGroup: TransitionGroup
};
```
> Transition
```

var Transition = {
  name: 'transition',
  props: transitionProps,
  abstract: true,
  render: function render (h) {
    var this$1 = this;

    var children = this.$slots.default;
    if (!children) {
      return
    }

    // filter out text nodes (possible whitespaces)
    children = children.filter(function (c) { return c.tag; });
    /* istanbul ignore if */
    if (!children.length) {
      return
    }

    // warn multiple elements
    if ("development" !== 'production' && children.length > 1) {
      warn(
        '<transition> can only be used on a single element. Use ' +
        '<transition-group> for lists.',
        this.$parent
      );
    }

    var mode = this.mode;

    // warn invalid mode
    if ("development" !== 'production' &&
        mode && mode !== 'in-out' && mode !== 'out-in') {
      warn(
        'invalid <transition> mode: ' + mode,
        this.$parent
      );
    }

    var rawChild = children[0];

    // if this is a component root node and the component's
    // parent container node also has transition, skip.
    if (hasParentTransition(this.$vnode)) {
      return rawChild
    }

    // apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive
    var child = getRealChild(rawChild);
    /* istanbul ignore if */
    if (!child) {
      return rawChild
    }

    if (this._leaving) {
      return placeholder(h, rawChild)
    }

    var key = child.key = child.key == null || child.isStatic
      ? ("__v" + (child.tag + this._uid) + "__")
      : child.key;
    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild);

    // mark v-show
    // so that the transition module can hand over the control to the directive
    if (child.data.directives && child.data.directives.some(function (d) { return d.name === 'show'; })) {
      child.data.show = true;
    }

    if (oldChild && oldChild.data && oldChild.key !== key) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      var oldData = oldChild.data.transition = extend({}, data);

      // handle transition mode
      if (mode === 'out-in') {
        // return placeholder node and queue update when leave finishes
        this._leaving = true;
        mergeVNodeHook(oldData, 'afterLeave', function () {
          this$1._leaving = false;
          this$1.$forceUpdate();
        }, key);
        return placeholder(h, rawChild)
      } else if (mode === 'in-out') {
        var delayedLeave;
        var performLeave = function () { delayedLeave(); };
        mergeVNodeHook(data, 'afterEnter', performLeave, key);
        mergeVNodeHook(data, 'enterCancelled', performLeave, key);
        mergeVNodeHook(oldData, 'delayLeave', function (leave) {
          delayedLeave = leave;
        }, key);
      }
    }

    return rawChild
  }
};

/*  */

// Provides transition support for list items.
// supports move transitions using the FLIP technique.

// Because the vdom's children update algorithm is "unstable" - i.e.
// it doesn't guarantee the relative positioning of removed elements,
// we force transition-group to update its children into two passes:
// in the first pass, we remove all nodes that need to be removed,
// triggering their leaving transition; in the second pass, we insert/move
// into the final disired state. This way in the second pass removed
// nodes will remain where they should be.

var props = extend({
  tag: String,
  moveClass: String
}, transitionProps);

delete props.mode;
```