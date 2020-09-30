<template>
  <div>
    <p class="msg">
      {{msg}}
    </p>
  </div>
</template>

<script>
export default { //配置对象(与vue一致)
  data(){  //组件里必须写函数
    return {
      msg: "hello vue component"
    }
  }
}
</script>

<style>
  .msg{
    color: red;
    font-size: 30px;
  }
</style>
