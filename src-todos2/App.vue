<template>
  <div class="todo-container">
    <div class="todo-wrap">
<!--      <TodoHeader @addTodo="addTodo"/> &lt;!&ndash;给TodoHeader标签对象绑定addTodo实践监听&ndash;&gt;-->
      <TodoHeader ref="header"/>
      <TodoList :todos="todos"/>
<!--      <TodoFooter :todos="todos" :deleteCompleteTodos="deleteCompleteTodos" :selectAllTodos="selectAllTodos"/>-->
      <todo-footer>
        <input type="checkbox" v-model="isAllCheck" slot="checkAll"/>
        <span slot="count">已完成{{completeSize}} / 全部{{todos.length}} </span>
        <button class="btn btn-danger" v-show="completeSize" @click="deleteCompleteTodos" slot="delete">清除已完成任务</button>
      </todo-footer>
    </div>
  </div>
</template>

<script>
  import TodoHeader from './components/TodoHeader'
  import TodoList from './components/TodoList'
  import TodoFooter from './components/TodoFooter'
  import PubSub from 'pubsub-js'

  import storageUtil from './util/storageUtil'

  export default {
    data () {
      return {
        todos:storageUtil.readTodos()
      }
    },
    computed:{
      completeSize(){
        return this.todos.reduce((preTotal,todo)=>preTotal+ (todo.complete?1:0),0)
      },
      isAllCheck:{
        get(){
          return this.completeSize === this.todos.length && this.completeSize>0
        },
        set(value){ //value是当前checkbox最新的值
          this.selectAllTodos(value);
        }
      }
    }
    ,
    mounted () {
      //给<Todoheader/>板顶addTodo时间监听
      // this.$on('addTodo',this.addTodo)
      this.$refs.header.$on('addTodo',this.addTodo);

      //订阅消息
      PubSub.subscribe('deleteTodo',(msg,index)=> {
        this.deleteTodo(index);
      })
    },
    methods: {
      addTodo (todo) {
        this.todos.unshift(todo)
      },
      deleteTodo(index){
        this.todos.splice(index, 1)
      },
      deleteCompleteTodos(){
        this.todos = this.todos.filter(todo=>!todo.complete)
      },
      selectAllTodos(check){
        this.todos.forEach(todo=>todo.complete = check)
      }
    },
    watch:{//深度监视
      todos:{
        deep:true,  //深度监视
        // handler:function (newValue) {
        // // 将todos最新的值JSON数据格式，保存到localstorage
        //   storageUtil.saveTodos(newValue);
        // }
        handler:storageUtil.saveTodos
      }
    }
    ,
    components: {
      TodoHeader,
      TodoList,
      TodoFooter
    }
  }
</script>

<style>
  .todo-container {
    width: 600px;
    margin: 0 auto;
  }

  .todo-container .todo-wrap {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }

</style>
