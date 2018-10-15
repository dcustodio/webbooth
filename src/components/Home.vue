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
    <div v-for="(alert, index) in alerts" :key="index">

        <v-alert
         :value="true"
         dismissible
         :type=alert.type>
          {{alert.msg}}
        </v-alert>
    </div>
  </div>
</template>

<script>
import { ping, takePicture, getPicture } from '../api/index.js'
import cuid from 'cuid'

export default {
  name: 'Home',

  data: function () {
    return {
      count: 3,
      isTakingPhoto: false,
      alerts: [{
        type: 'info',
        msg: 'Carregar no botão, olhar para a camara e contar até três.'
      }],
      photos: []
    }
  },

  created: function () {
    // `this` points to the vm instance
    console.log('a is: ' + this.alerts)

    this.increment()
  },
  computed: {
  },
  methods: {

    increment: async function () {
      let alerts = this.alerts
      await ping().catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data)
          console.log(error.response.status)
          console.log(error.response.headers)

          alerts.push({type: 'error', msg: 'cannot connect to the API'})
        }
      })
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
          console.log(a)
          this.getPictureById(captureId)
        })
      } catch (error) {
        debugger; //eslint-disable-line
        console.error(error)
        this.isTakingPhoto = false
      }
    },
    getPictureById: (id) => {
      let tries = 0
      const interval = setInterval(() => {
        debugger//eslint-disable-line
        tries++
        getPicture(id)
          .then(result => {
            debugger//eslint-disable-line
            clearInterval(interval)
            return result.data
          })
          .catch(error => {
            debugger//eslint-disable-line
          })

        if (tries > 5) {
          clearInterval(interval)
          throw new Error('picture not available')
        }
      }, 5000)
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
</style>
