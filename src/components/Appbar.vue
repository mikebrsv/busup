<template lang='pug'>
v-app-bar(app, color="primary", dark)
  .container
    .d-flex.align-center
      div
        v-hover(v-slot="{ hover }")
          a.text-decoration-none(
            href="/",
            :class="`${hover ? 'blue--text text--darken-4' : 'white--text'}`"
          ) BusUp Challenge
</template>

<script>
export default {
  name: "Appbar",
  data: () => ({
    //
  }),
};
</script>
