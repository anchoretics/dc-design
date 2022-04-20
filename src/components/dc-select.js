export default {
  name: "dc-select",
  props: ['value'],
  render: function (createElement) {
    var self = this
    return createElement('select', {
      domProps: {
        value: self.value,
      },
      attrs: {
        'class': 'form-control'
      },
      on: {
        change: function (event) {
          console.log(event.target.value)
          self.$emit('input', event.target.value)
        }
      }
    }, this.$slots.default)
  }
}