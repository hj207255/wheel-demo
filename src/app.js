import Vue from 'vue'
import Button from './button.vue'
import Icon from './icon.vue'
import ButtonGroup from './button-group.vue'

Vue.component('g-button',Button)
Vue.component('g-icon',Icon)
Vue.component('g-button-group',ButtonGroup)

new Vue({
  el: "#app",
  data: {
    "loading1": false,
    "loading2": false,
    "loading3": false,
  }
})



import chai from 'chai'
import spies from 'chai-spies'
chai.use(spies)

const expect = chai.expect
// 单元测试
{
  // 因为没有办法通过对象实例化一个东西，所以需要将对象改为函数
  const Constructor = Vue.extend(Button)
  const vm = new Constructor({
    propsData: {
      icon: 'settings'
    }
  })
  vm.$mount()
  // 至此，动态生成按钮通过js
  let useElement = vm.$el.querySelector('use')
  let href = useElement.getAttribute('xlink:href')
  expect(href).to.eq('#i-settings')
  // 移除该实例
  vm.$el.remove()
  vm.$destroy()
}
{
  const Constructor = Vue.extend(Button)
  const vm = new Constructor({
    propsData: {
      icon: 'settings',
      loading: true
    }
  })
  vm.$mount()
  let useElement = vm.$el.querySelector('use')
  let href = useElement.getAttribute('xlink:href')
  expect(href).to.eq('#i-jiazai')
  vm.$el.remove()
  vm.$destroy()
}
{
  // 创建div 将按钮挂在到当前div中测试
  const div = document.createElement('div')
  document.body.appendChild(div)
  const Constructor = Vue.extend(Button)
  const vm = new Constructor({
    propsData: {
      icon: 'settings',
      iconPosition: 'left'
    }
  })
  // 需要将button加载到页面中才会加载相应的css，否则该order（css）为空
  vm.$mount(div)
  let svg = vm.$el.querySelector('svg')
  // es6的析构语法，获取svg的所有CSS属性值中的order
  // es6解构赋值，即“模式匹配”，对号入座
  let {order} = window.getComputedStyle(svg)
  // let order = window.getComputedStyle(svg).order es5语法
  console.log({order})
  expect(order).to.eq('1')
  vm.$el.remove()
  vm.$destroy()
}
{
  const div = document.createElement('div')
  document.body.appendChild(div)
  const Constructor = Vue.extend(Button)
  const vm = new Constructor({
    propsData: {
      icon: 'settings',
      iconPosition: 'right'
    }
  })
  vm.$mount(div)
  let svg = vm.$el.querySelector('svg')
  let {order} = window.getComputedStyle(svg)
  expect(order).to.eq('2')
  vm.$el.remove()
  vm.$destroy()
}
{
  // mock
  const Constructor = Vue.extend(Button)
  const vm = new Constructor({
    propsData: {
      icon: 'settings',
    }
  })
  vm.$mount()
  // 设置间谍函数
  let spy = chai.spy(function(){})

  vm.$on('click', spy)
  // 希望这个函数被执行，即间谍函数被调用
  let button = vm.$el
  button.click()
  expect(spy).to.have.been.called()
}