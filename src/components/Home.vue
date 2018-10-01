<template>
  <div class='hello'>
    <h1>{{ msg }}</h1>
     Counter: count is {{  count }}.
    <p>Reversed message: '{{ reverseMessage() }}'</p>

    <button class='foo-button mdc-button' @click='increment'>Click me</button>
    <v-btn color='success'  @click='takePicture'>Take Pic</v-btn>
    {{$global.sessionId}}
  </div>
</template>

<script>
import { ping ,takePicture } from '../api/index.js'
import cuid from 'cuid'

export default {
  name: 'Home',

  data: function () {
    return {
      msg: 'Welcome to Your Vue.js App',
      count: 0
    }
  },
  computed: {},
  methods: {
    reverseMessage: function () {
      return this.msg
        .split('')
        .reverse()
        .join('')
    },
    increment: function () {
      ping()
    },
    takePicture: function async () {
      const captureId = cuid()
      
      try {
     
        takePicture(this.$global.sessionId, captureId).then((a)=>{
          debugger//eslint-disable-line
          console.log(a.json())
        })

     
      } catch (error) {
        debugger//eslint-disable-line
        console.error(error)
      }
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
</style>
