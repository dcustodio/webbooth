<template>

  <v-card>
    <v-layout row wrap>
      <v-flex
        v-for="p in photos"
        :key="p.id"
        xs4
        d-flex
      >

        <v-card flat tile class="d-flex">
           <a :href="'#/photo/'+p.id"><v-img
            :src="p.url"
            :lazy-src="p.url"
            aspect-ratio="1"
            class="grey lighten-2"
          >
            <v-layout
              slot="placeholder"
              fill-height
              align-center
              justify-center
              ma-0
            >
              <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
            </v-layout>
          </v-img>
          </a>
        </v-card>
      </v-flex>
    </v-layout>
  </v-card>

</template>
<script>
import { getAllpictures } from '../api/index.js'
export default {

  data: function () {
    return {
      photos: []
    }
  },
  created: function () {
    // `this` points to the vm instance
    console.log('a is: ' + this.alerts)

    getAllpictures().then(result => {
      this.photos = result.data
    })
  }
}
</script>
<style lang="scss">
</style>
