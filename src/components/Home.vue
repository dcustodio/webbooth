<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <h2>{{ count }}</h2>

    <v-btn large color="teal" @click="takePicture" v-bind:disabled="isTakingPhoto">Tirar foto!</v-btn>
    <v-progress-circular :size="50" :width="10" color="primary" indeterminate="" v-show="isTakingPhoto && count === 0"></v-progress-circular>

    <v-card v-show="false">
      <v-img src="https://picsum.photos/510/300?random" height="70vh"></v-img>
      <v-card-title primary-title>
        <div>
          <h3 class="headline mb-0">Kangaroo Valley Safari</h3>
          <div>Located two hours south of Sydney in the
            <br>Southern Highlands of New South Wales, ...
          </div>
        </div>
      </v-card-title>
      <v-card-actions>
        <v-btn flat color="orange">Share</v-btn>
        <v-btn flat color="orange">Explore</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { ping, takePicture } from '../api/index.js'
import cuid from 'cuid'

export default {
  name: 'Home',

  data: function () {
    return {
      msg: 'Carregar no botão, olhar para a camera e contar até três.',
      count: 3,
      isTakingPhoto: false
    }
  },
  computed: {
  },
  methods: {

    increment: function () {
      ping()
    },
    takePicture: function () {
      const captureId = cuid()
      this.count = 3
      this.isTakingPhoto = true

      const interval = setInterval(() => {
        if (this.count === 0) {
          clearInterval(interval)
          return
        }
        this.count -= 1
      }, 1000)

      try {
        takePicture(this.$global.sessionId, captureId).then(a => {
          debugger; //eslint-disable-line
          console.log(a)
        })
      } catch (error) {
        debugger; //eslint-disable-line
        console.error(error)
        this.isTakingPhoto = false
      }
    },
    getPicture: url => {
      return 'https://res.cloudinary.com/dwcg7v23g/image/upload/v1538175342/fo2zkt9rixtlldhw7xpb.jpg'
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
</style>
