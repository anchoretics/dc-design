export default {
  name: "dc-input",
  props: ['value'],
  render: function (createElement) {
    var self = this
    return createElement('input', {
      domProps: {
        value: self.value
      },
      attrs: {
        'class': 'form-control'
      },
      on: {
        input: function (event) {
          self.$emit('input', event.target.value)
        }
      }
    })
  }
}