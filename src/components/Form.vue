<template>
  <div class="box py-5 px-3">
    <h3 class="has-text-centered title">Add Sample Data</h3>
    <!-- error messages-->
    <p class="notification is-danger has-text-centered" v-if="errors.length">
    <b>Please correct the following error(s):</b>
    <ul>
      <li v-for="error in errors" :key="error">{{ error }}</li>
    </ul>
  </p>
    
    <!-- form inputs -->
    <div class="field">
      <label class="label">Name</label>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="Enter Name"
          v-model.trim="form.name"
        />
      </div>
    </div>
    <div class="field">
      <label class="label">Age</label>
      <div class="control">
        <input
          class="input"
          type="number"
          placeholder="Enter Age"
          v-model.number.trim="form.age"
        />
      </div>
    </div>

    <div class="field">
      <label class="label">Blood Group</label>
      <div class="control">
        <div class="select">
          <select  v-model="form.bloodGroup">
        <option
              v-for="(category, index) in categories"
              :value="category"
              :key="index"
             
              >{{ category }}</option
            >
          </select>
        </div>
      </div>
    </div>
    <div class="field">
      <div class="control is-flex is-justify-content-center">
        <button class="button is-primary" @click="onFormSubmit">Submit</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../api";
export default {
  data() {
    return {
      form: {
        name: null,
        age: null,
        bloodGroup:"A",
      },
      categories: ["A", "AB", "B", "O"],
     
      errors: [],
    };
  },
  methods: {
    onFormSubmit() {
        //submit form data
     if (this.form.name  && this.form.age && this.form.bloodGroup) {
      return axios
          .post("/sample.json", this.form)
          .then(() => {
              //clear input on success
           alert("Form Submiited");
            this.form.name = null;
            this.form.age = null;
            this.form.bloodGroup = null;
            this.errors = []
          })
          .catch(() => {
            alert("Trouble submitting data,please try again ");

          });
      }
      //handle form errors
      this.errors = [];

      if (!this.form.name) {
        this.errors.push("Name required.");
      }
      if (!this.form.age) {
        this.errors.push("Age required.");
      }
 
    
    },
  },
};
</script>
