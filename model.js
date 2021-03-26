export default class Model {
  constructor(options = {}) {
    const { data = [] } = options
    delete options.data

    this.$collection = []

    const defaultOptions = { primaryKey: 'id' }
    this.$options = Object.assign(defaultOptions, options)

    if (data) {
      this.record(data)
    }
  }

  record(data) {
    const normalizedData = data.map(entry => {
      if (!entry[this.$options.primaryKey])
        entry[this.$options.primaryKey] = Date.now()
      return entry
    })
    this.$collection.push(...normalizedData)
  }

  all() {
    return this.$collection.map(
      entry => Object.assign({}, entry))
  }

  find(id) {
    const match = this.$collection.find(
      entry => entry[this.$options.primaryKey] === id)

    if (match)
      return Object.assign({}, match)

    return null
  }

  update(id, data) {
    const index = this.$collection.findIndex(
      entry => entry[this.$options.primaryKey] === id)

    if (index < 0)
      return false

    this.$collection.splice(
      index,
      1,
      Object.assign(this.$collection[index], data)
    )
  }

  delete(id) {
    const index = this.$collection.findIndex(
      entry => entry[this.$options.primaryKey] === id)

    if (index < 0)
      return false

    this.$collection.splice(index, 1)
  }
}
