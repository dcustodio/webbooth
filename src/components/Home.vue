<template>
  <div class="hello">
    <h1></h1>

    <h2></h2>

    <v-btn large fixed bottom right fab color="primary"
      @click="takePicture" v-bind:disabled="isTakingPhoto">
      <i class="material-icons">add_a_photo</i>
    </v-btn>

<v-dialog
      v-model="isTakingPhoto"
      hide-overlay
      persistent
      width="300"
    >
      <v-card
        color="primary"
        dark
      >
        <v-card-text>
          <strong v-show="count > 0" large>{{ count }}</strong>
          <span v-show="count === 0">Please stand by</span>
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>

        </v-card-text>
      </v-card>
    </v-dialog>

 <v-alert
      :value="true"
      type="info"
    >
      {{ msg }}
    </v-alert>
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
