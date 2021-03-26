export default class Model {
  constructor(data = []) {
    this.$collection = []

    if (data) {
      this.record(data)
    }
  }

  record(data) {
    const normalizedData = data.map(entry => {
      if (!entry.id)
        entry.id = Date.now()
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
      entry => entry.id === id)

    if (match)
      return Object.assign({}, match)

    return null
  }

  update(id, data) {
    const index = this.$collection.findIndex(
      entry => entry.id === id)

    this.$collection.splice(
      index,
      1,
      Object.assign(this.$collection[index], data)
    )
  }
}
