<template>
<v-card>
    <v-img
        :src="photo.url"
    >
    </v-img>
</v-card>
</template>

<script>
import { getPicture } from '../api/index.js'

export default {
  data: function () {
    return {
      photo: {
        url: ''
      }
    }
  },
  created () {
    this.fetchPhoto()
  },
  methods: {

    fetchPhoto: function () {
      getPicture(this.$route.params.id)
        .then(({data}) => {
          this.photo = data
        })
        .catch(error => {
          console.error(error)
        })
    }
  }
}
</script>

<style>
</style>
