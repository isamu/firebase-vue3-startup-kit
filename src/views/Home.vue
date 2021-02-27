<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" class="logo">
    <img alt="Firebase logo" src="../assets/firebase.svg" class="logo">
    
    <HelloWorld msg="Welcome to Your Firebase Vue3 Startup Kit"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

export default defineComponent({
  name: 'Home',
  components: {
    HelloWorld,
  },
});
</script>

<style>
.logo {
  height: 150px;  
}
</style>
