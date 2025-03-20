<template>
    <div>
      Quiz info
      <p>{{ $route.params.id    }}</p>
    </div>
  </template>
  <script setup>
  definePageMeta({
    layout: 'lecturer-profile',
  });
  </script>
  