<template>
  <div class="hello">
    <h1></h1>

    <h2></h2>

    <v-btn large fixed bottom right fab color="primary"
      @click="takePictureAndGetBack" v-bind:disabled="isTakingPhoto">
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
    {{ photos }}
    <div v-for="(photo) in photos" :key="photo.id">

      <v-card>
        <v-img
          :src="photo.url"
          aspect-ratio="2.75"
        ></v-img>

        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">Kangaroo Valley Safari</h3>
            <div>Located two hours south of Sydney in the <br>Southern Highlands of New South Wales, ...</div>
          </div>
        </v-card-title>

        <v-card-actions>
          <v-btn flat color="orange">Share</v-btn>
          <v-btn flat color="orange">Explore</v-btn>
        </v-card-actions>
      </v-card>
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

    this.checkStatus()
  },
  persist: ['photos'],
  computed: {
  },
  methods: {

    checkStatus: async function () {
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
    takePictureAndGetBack: function () {
      const captureId = cuid()
      this.count = 3
      this.isTakingPhoto = true

      // timer
      const interval = setInterval(() => {
        if (this.count === 0) {
          clearInterval(interval)
          return
        }
        this.count -= 1
      }, 1000)

      try {
        takePicture(this.$global.sessionId, captureId).then(a => {
          console.log('took picture:', a)
          this.pollForPicture(captureId)
        })
      } catch (error) {
        console.error(error)
        this.isTakingPhoto = false
      }
    },
    getPictureById: async (id) => {
      const picture = await getPicture(id)
        .then(result => {
          return result.data
        })
        .catch(error => {
          console.error(error)
        })

      return picture
    },
    pollForPicture: function (id) {
      const delay =(ms) => new Promise(fn => setTimeout(fn, ms))// eslint-disable-line
      getPicture(id).then(({data}) => {
        if (data.url) {
          this.photos.push(data)
          this.isTakingPhoto = false

          return data
        } else {
          console.log('delay')
          return delay(1000).then(() => this.pollForPicture(id))
        }
      })
    }

  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
</style>
