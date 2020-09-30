/*
入口js:创建vue实例
 */
import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App'

//声明使用插件
Vue.use(VueResource)  //内部会被vm对象和组件对象添加一个属性: $http

new Vue({
  el:'#app',
  components:{App},
  template:'<App/>'
})
