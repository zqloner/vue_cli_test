<template>
 <div>
   <p>ID:{{$route.params.id}}</p>
   <ul>
     <li>id:{{messageDetail.id}}</li>
     <li>title:{{messageDetail.title}}</li>
     <li>content:{{messageDetail.content}}</li>
   </ul>
 </div>
</template>

<script>

  export default {
    name: 'MessageDetail',
    data () {
      return{
        messageDetail:{}
      }
    },
    mounted () {
      setTimeout(()=>{
        const allMessages = [
          {
            id:1,
            title:' message001',
            content:' message001...   Content'
          },
          {
            id:2,
            title:' message002',
            content:'message002...   Content2'
          },  {
            id:3,
            title:'message003',
            content:' message003...   Content3'
          },
        ]
        this.allMessages = allMessages
        const id = this.$route.params.id*1
        this.messageDetail = this.allMessages.find(detail=>detail.id ==id )
      },1000)
    },
    watch:{
      $route:function (value) {  //路由路径发生了改变(param)
        const id = value.params.id*1
        this.messageDetail = this.allMessages.find(detail=>detail.id ==id )
      }
    }
  }
</script>

<style scoped>

</style>
