<template>
  <div>
    <p>{{msg}}</p>
    <input type="text">
  </div>
</template>

<script>
  export default {
    name: 'About',
    props:{
      msg:String
    }
  }
</script>

<style scoped>

</style>
