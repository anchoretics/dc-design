<template>
  <div class="form-item">

    <label v-if="required" style="color: red;">*{{label}}</label>
    <label v-else>{{label}}</label>
    <slot/>
    <div class="msg"></div>
  </div>
</template>

<script>
export default {
  name: "dc-form-item",
  props: ['prop', 'label'],
  computed: {
    rule() {
      if(this.prop && this.$parent.rules) {
        return this.$parent.rules[this.prop]
      }
      return null
    },
    required() {
      return this.rule && this.rule.require === true
    }
  }
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