<template>
  <div clsss="form">
    <slot name="default" is="rules"/>
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