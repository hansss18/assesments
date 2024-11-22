<template>
  <div>
    <Sidebar />
    <RouterView />
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
import Sidebar from "./components/Sidebar.vue";
</script>

<style lang="scss" scoped></style>