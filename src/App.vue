<template>
  <div id="app">
    <v-app dark>
      <v-toolbar color="primary">
        <v-toolbar-title> Photo Booth</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn flat href="#/"><i class="material-icons">home</i></v-btn>
          <v-btn flat href="#/gallery"><i class="material-icons">view_comfy</i></v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <!-- <img src="./assets/logo.png"> -->
      <v-container grid-list-sm >
        <v-layout>
          <v-flex xs12 sm6 offset-sm3>
            <router-view/>
          </v-flex>
        </v-layout>
      </v-container>
    </v-app>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;

}
</style>
