<template>
  <div id="app">
    <IHome></IHome>
  </div>
</template>

<script>
import Home from './views/Home.vue'

export default {
  name: 'app',
  components: {
    IHome:Home
  }
}
</script>

<style>
body {
  padding: 0px;
  margin: 0px;
}
</style>
