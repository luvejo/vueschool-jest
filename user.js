class User {
  constructor(details) {
    const { first_name, last_name } = details
    this.first_name = first_name
    this.last_name = last_name
  }

  get name() {
    return `${this.first_name} ${this.last_name}`
  }
}

export default User
