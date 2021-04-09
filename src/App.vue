<template lang='pug'>
v-app
  Appbar

  v-main
    Table
</template>

<script>
import Appbar from "./components/Appbar";
import Table from "./components/Table";

export default {
  name: "App",

  components: {
    Table,
    Appbar,
  },

  data: () => ({
    //
  }),
};
</script>
