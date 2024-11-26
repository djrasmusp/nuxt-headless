<script setup lang="ts">

  const data = await $fetch('https://randomuser.me/api/')
  const route = useRoute()
</script>

<template>
  <div>
    <AppNavigation></AppNavigation>

    <div>
      <pre>{{ route.path }}</pre>
      <pre>{{ data?.results[0]?.name.first }} {{ data?.results[0]?.name.last }}</pre>
    </div>
  </div>
</template>
