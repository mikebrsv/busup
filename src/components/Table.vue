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
        v-dialog(v-model="dialog" max-width="405px")
          template(v-slot:activator="{on, attrs}")
            v-hover(v-slot="{hover}")
              v-btn(rounded outlined  v-bind="attrs" v-on="on" :class="`${hover ? 'blue darken-2 white--text' : 'blue--text text--darken-2'}`").text-none.mb-2 + Add new
          v-card
            .text-right.pt-3.pr-3
              v-btn(icon small @click="close")
                v-icon mdi-close
            v-container.pt-0
              v-card-title.pt-0.px-7.pb-7
                span.headline.font-weight-medium Create new
              v-card-text.px-8.pb-7
                v-form(@submit.prevent="submit")
                  .mb-2
                    label(for="ccName").grey--text.px-2 CC Name
                  v-text-field(placeholder="Insert name" outlined single-line v-model="ccName")#ccName
                  .mb-2
                    label(for="companyId").grey--text.px-2 Company ID
                  v-text-field(placeholder="Insert CC" outlined single-line v-model="companyId")#companyId
                  .text-center
                    v-btn(rounded depressed type="submit").text-none.px-9 Save
</template>

<script>
import axios from "axios";
import { api } from "../config";

const { url, token } = api;
const options = {
  headers: {
    Authorization: `Bearer ${token}`
  },
};

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

    dialog: false,
    dialogDelete: false,

    ccName: "",
    companyId: null,
  }),

  watch: {
    dialog(val) {
      val || this.close();
    },

    // dialogDelete(val) {
    //   val || this.closeDelete();
    // },
  },

  methods: {
    submit() {
      console.log("ccName", this.ccName);
      console.log("companyId", this.companyId);

      let data = new FormData();
      data.append("name", this.ccName);
      data.append("company_id", this.companyId);

      console.log(data);
      for (var key of data.entries()) {
        console.log(key[0] + ", " + key[1]);
      }

      axios
        .post(url, data, 
        {...options, headers: {...options.headers, "Content-Type": "multipart/form-data"}}
        )
        .then((res) => {
          // console.log(res.data.data.table);
          // this.costCenters = res.data.data.table;
          console.log(res.data.data);
          this.costCenters.push(res.data.data)
        })
        .catch((err) => {
          console.error(err.response);
        })
      .finally(() => {
        console.log(options);
        console.log({...options, headers: {...options.headers, "Content-Type": "multipart/form-data"}});
      })
    },

    close() {
      this.dialog = false;
      this.ccName = "";
      this.companyId = "";
      // this.$nextTick(() => {
      //   //
      // });
    },

    // closeDelete() {
    //   this.dialogDelete = false;
    //   this.$nextTick(() => {
    //     //
    //   });
    // },
  },

  mounted() {
    axios
      .get(url, options)
      .then((res) => {
        // console.log(res.data.data.table);
        this.costCenters = res.data.data.table;
        console.log(this.costCenters)
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
