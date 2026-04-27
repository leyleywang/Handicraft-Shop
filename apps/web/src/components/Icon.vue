<template>
  <i :class="['iconfont', `icon-${name}`, class]"></i>
</template>

<script setup lang="ts">
defineProps({
  name: {
    type: String,
    required: true
  },
  class: {
    type: String,
    default: ''
  }
})
</script>
