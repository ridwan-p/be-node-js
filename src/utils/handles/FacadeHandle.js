
module.exports = {
  get: function(target, prop, receiver) {
    const value =  target[prop]
    if(value instanceof Function) {
      return function(...args) {
        return value.apply(this === receiver ? target: this, args)
      }
    }
    return value
  }
}