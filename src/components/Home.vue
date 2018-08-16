<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
     Counter: count is {{  count }}.
    <p>Reversed message: "{{ reverseMessage() }}"</p>

    <button class="foo-button mdc-button" @click="increment">Click me</button>
    <!-- <button click="ping">Click me 2</button> -->
  </div>
</template>

<script>
export default {
  name: "Home",

  data: function() {
    return {
      msg: "Welcome to Your Vue.js App",
      count: 0
    };
  },
  computed: {},
  methods: {
    reverseMessage: function() {
      return this.msg
        .split("")
        .reverse()
        .join("");
    },
    increment: function() {
      return this.count++;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
