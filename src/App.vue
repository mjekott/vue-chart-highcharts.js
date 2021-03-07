<template>
  <div class="container px-5">
    <the-header @toggle="toggle"></the-header>
    <keep-alive>
      <component :is="selectedComponent" class="mt-5"> </component>
    </keep-alive>
  </div>
</template>

<script>
import TheHeader from "./components/TheHeader.vue";
import Dashboard from "./components/Dashboard";
import Form from "./components/Form";
export default {
  name: "App",
  components: {
    TheHeader,
    Dashboard,
    Form,
  },
  data() {
    return {
      selectedComponent: "Dashboard",
    };
  },
  methods: {
    toggle(data) {
      this.selectedComponent = data;
    },
  },
};
</script>

<style></style>
