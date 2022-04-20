<template>
  <div class="form-item">

    <label v-if="label !== null && $parent.rules[prop] && $parent.rules[prop].require === true" style="color: red;">*{{label}}</label>
    <label v-else-if="label !== null">{{label}}</label>
    <slot :test="123"/>
    <div class="msg"></div>
  </div>
</template>

<script>
export default {
  name: "dc-form-item",
  props: ['prop', 'label']
}
</script>

<style scoped lang="scss">
.form-item {
  .msg {
    height: 20px;
    font-size: 12px;
  }
}
</style>