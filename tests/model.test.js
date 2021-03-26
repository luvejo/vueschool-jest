import Model from '../model'

test('new works', () => {
  expect(new Model).toBeInstanceOf(Model)
})

test('model structure', () => {
  expect(new Model).toEqual(
    expect.objectContaining({
      $collection: expect.any(Array),
      $options: expect.objectContaining({
        primaryKey: 'id'
      }),
      record: expect.any(Function),
      all: expect.any(Function),
      find: expect.anything(),
      update: expect.anything(),
    })
  )
})

describe('constructor()', () => {
  const writers = [{ id: 1, name: 'J. D. Salinger' }]

  test('can define the primary key', () => {
    const model = new Model({
      primaryKey: 'name'
    })
    expect(model.$options.primaryKey).toBe('name')
  })

  test('set $collection with passed data', () => {
    const model = new Model({ data: writers })
    expect(model.$collection).toEqual(writers)
  })
})

describe('record()', () => {
  const writers = [{ id: 1, name: 'J. D. Salinger' }, { name: 'J. K. Toole' }]

  test('can add data to the collection', () => {
    const model = new Model()
    model.record(writers)
    expect(model.$collection).toEqual([
      writers[0],
      {
        id: expect.any(Number),
        name: writers[1].name
      }
    ])
  })

  test('gets called when data is passed to Model', () => {
    const spy = jest.spyOn(Model.prototype, 'record')
    new Model(writers)

    expect(spy).toHaveBeenCalled()
    spy.mockRestore()
  })
})


describe('all()', () => {
  const writers = [{ name: 'J. D. Salinger' }, { name: 'J. K. Toole' }]
  let model

  beforeEach(() => {
    model = new Model()
    model.$collection = writers
  })

  test('retrieves $collection value', () => {
    expect(model.all()).toEqual(writers)

    model.$collection = []

    expect(model.all()).toEqual([])
  })

  test('original data stays intact', () => {
    const data = model.all()
    data[0].name = 'David Sedaris'

    expect(model.$collection[0].name).toEqual('J. D. Salinger')
  })
})


describe('find()', () => {
  const writers = [{ id: 1, name: 'J. D. Salinger' }, { id: 2, name: 'J. K. Toole' }]
  let model

  beforeEach(() => {
    model = new Model()
    model.$collection = writers
  })

  test('returns null if nothing matches', () => {
    expect(model.find(3)).toEqual(null)
  })

  test('retrieves a matching entry', () => {
    expect(model.find(1)).toEqual(writers[0])
  })
})


describe('update()', () => {
  const writers = [{ id: 1, name: 'J. D. Salinger' }]
  let model

  beforeEach(() => {
    model = new Model()
    model.$collection = JSON.parse(JSON.stringify(writers))
  })

  test('modify entry by id', () => {
    model.update(1, { name: 'Sedaris' })

    expect(model.$collection[0]).toEqual({ id: 1, name: 'Sedaris' })
  })

  test('extend entry by id', () => {
    model.update(1, { gender: 'male' })
    expect(model.$collection[0]).toEqual(
      expect.objectContaining({
        name: 'J. D. Salinger',
        gender: 'male'
      })
    )
  })

  test('return false if no entry matches', () => {
    expect(model.update(3, {})).toBe(false)
  })
})
