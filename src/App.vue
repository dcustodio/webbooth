<template>
  <div id="app">
    <v-app>
      <v-toolbar color="primary">
        <v-toolbar-side-icon></v-toolbar-side-icon>
        <v-toolbar-title> Photo Booth</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn flat href="#/">Home</v-btn>
          <v-btn flat href="#/gallery">Galeria</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <!-- <img src="./assets/logo.png"> -->
      <v-container grid-list-sm fluid>
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
