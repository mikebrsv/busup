<template lang='pug'>
v-container
  v-data-table(
    :headers="headers",
    :items="costCenters",
    :items-per-page="5",
    item-key="name",
    :footer-props={
      showFirstLastPage: true
    },
    :loading="loading",
    loading-text="Loading..."
  )

    template(v-slot:top)
      v-toolbar(flat)
        v-toolbar-title.font-weight-medium Cost Center - AICA
        v-spacer
        v-dialog(max-width="50px")
          template(v-slot:activator="{on, attrs}")
            v-btn(rounded outlined color="primary").text-none.mb-2 + Add new
</template>

<script>
import axios from "axios";
import config from "../config";

const url = config.url;
const token = config.token;
const options = { headers: { Authorization: `Bearer ${token}` } };

export default {
  name: "Table",

  data: () => ({
    costCenters: [],
    loading: true,
    headers: [
      {
        text: "ID",
        value: "id",
      },
      { text: "Name", value: "name" },
      { text: "Company ID", value: "company_id" },
      { text: "Options" },
    ],
  }),

  mounted() {
    axios
      .get(url, options)
      .then((res) => {
        // console.log(res.data.data.table);
        this.costCenters = res.data.data.table;
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => (this.loading = false));
  },

  // async mounted() {
  //   try {
  //     const response = await fetch(url, options);
  //     const data = await response.json();
  //     this.costCenters = await data.data.table;
  //   } catch (err) {
  //     console.error(err);
  //   }
  //   this.loading = false
  // },
};
</script>
