<template>
  <nav class="navbar " role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <h2 class="navbar-item title">Vue-Dashboard</h2>
      <a
        role="button"
        class="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
        @click="open = !open"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div
      id="navbarBasicExample"
      class="navbar-menu"
      :class="{ 'is-active': open }"
    >
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <button
              class="button is-primary"
              @click="$emit('toggle', 'Dashboard')"
            >
              <strong>Dashboard</strong>
            </button>
            <button class="button is-light" @click="$emit('toggle', 'Form')">
              Add Sample
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      open: false,
    };
  },
  methods: {},
};
</script>
