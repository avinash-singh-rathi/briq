<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <q-page class="flex flex-center bg-brand">

      </q-page>  
    </q-page-container>

  </q-layout>
</template>

<style>
</style>

<script>
export default {
  props:['provider','token'],
  data () {
    return {
      drawerState: true,
    }
  },
  methods: {
    
  },
  mounted(){
    //console.log('Hello');
    console.log(this.$route.params.provider);
    console.log(this.$route.params.token);
    //console.log("Hi");
  }
}
</script>