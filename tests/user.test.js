import User from '../user'

describe('User', () => {
  test('name returns full name', () => {
    const user = new User({ first_name: 'Julio', last_name: 'Cortázar' })
    expect(user.name).toBe('Julio Cortázar')
  })

  test('creates snapshot', () => {
    const user = { "name": "Tony Tinkerton", "age": 42, "job": "inventor" }

    expect(user).toMatchSnapshot()
  })
})
