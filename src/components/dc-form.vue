<template>
  <div clsss="form">
    <slot/>
  </div>
</template>

<script>
export default {
  name: "dc-form",
  props: {
    rules: Object
  },
  data() {
    return {

    }
  }
}
</script>

<style scoped>

</style>