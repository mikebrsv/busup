<template lang='pug'>
v-container
  v-data-table(
    :headers="headers",
    :items="costCenters",
    :items-per-page="5",
    item-key="id",
    :footer-props={
      showFirstLastPage: true
    },
    :loading="loading",
    loading-text="Loading..."
    class="cost-centers-table"
  )

    template(v-slot:item.actions="{item}")
      v-btn(fab)
        v-icon mdi-pencil-outline

    template(v-slot:top)
      v-toolbar(flat)
        v-toolbar-title.font-weight-medium Cost Center
        v-spacer
        v-dialog(v-model="dialog" max-width="405px")
          template(v-slot:activator="{on, attrs}")
            v-hover(v-slot="{hover}")
              v-btn(rounded outlined v-bind="attrs" v-on="on" :class="hover ? 'blue darken-2 white--text' : 'blue--text text--darken-2'").text-none.mb-2 + Add new
          v-card
            .text-right.pt-3.pr-3
              v-btn(icon small @click="closeModal")
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
                    v-btn(rounded depressed color="secondary" type="submit" :disabled="canSubmit").text-none.px-9 Save  
</template>

<script>
import axios from "axios";
import { api } from "../config";

const { url, token } = api;
const options = {
  headers: {
    Authorization: `Bearer ${token}`,
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
      { text: "Actions", value: "actions", sortable: false },
    ],

    dialog: false,

    ccName: "",
    companyId: "",
  }),

  watch: {
    dialog(val) {
      val || this.closeModal();
    },
  },

  methods: {
    submit() {
      let data = new FormData();
      data.append("name", this.ccName);
      data.append("company_id", this.companyId);

      axios
        .post(url, data, {
          ...options,
          headers: {
            ...options.headers,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          this.costCenters.push(res.data.data);
          this.$emit("toggle-snackbar", `${this.ccName} has been created!`);
          this.closeModal();
        })
        .catch((err) => {
          console.error(err.response);
        });
    },

    closeModal() {
      this.dialog = false;
      this.ccName = "";
      this.companyId = "";
    },
  },

  computed: {
    canSubmit() {
      return (
        this.ccName.trim().length === 0 || this.companyId.trim().length === 0
      );
    },
  },

  mounted() {
    axios
      .get(url, options)
      .then((res) => {
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

<style lang="sass" scoped>
::v-deep
  .cost-centers-table
    .v-btn--fab.v-size--default
      background-color: #fff
      width: 28px
      height: 28px
      color: #7dbed0

      .v-icon
        height: 20px
        font-size: 20px
        width: 20px

@media (min-width: 600px)
  ::v-deep
    .theme--light
      &.v-data-table
        .v-data-footer
          border-top: none

    .cost-centers-table
      .v-data-table__wrapper,
      .v-data-footer
        flex: 0 0 70%
        max-width: 70%
        margin-left: auto
        margin-right: auto

      thead
        th
          width: 20%

          &:nth-child(2)
            width: 40%

      table
        border-collapse: collapse

      tr:nth-child(even)
        background-color: #eeeeee

      td,
      th
        border: 1px solid #dddddd

      .v-data-table-header__icon
        opacity: 1
        float: right
</style>