<template lang='pug'>
v-app
  Appbar

  v-main
    Table(@toggle-snackbar="toggleSnackbar")

    v-snackbar(v-model="showSnackbar", :timeout="snackbarTimeout") {{ typeof snackbarText === 'string' && snackbarText }}
      template(v-slot:action="{ attrs }")
        v-btn(color="blue", text, @click="showSnackbar = false") Close
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
    showSnackbar: false,
    snackbarTimeout: 2000,
    snackbarText: "",
  }),

  methods: {
    toggleSnackbar(snackbarText) {
      this.showSnackbar = !this.showSnackbar;
      this.snackbarText = snackbarText;
    },
  },
};
</script>
