<template>
  <div id="app">
    <mindmap :trees="json"/>
  </div>
</template>

<script>

import mindmap from './components/mindmap'
import json from './components/json2'

export default {
  name: 'app',
  components: {
    mindmap
  },
  data() {
    return {
      json
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
