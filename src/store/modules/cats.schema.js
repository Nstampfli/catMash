import { schema } from 'normalizr'

const catEntity = new schema.Entity(
  'cats',
  { cats: {} },
  {
    processStrategy: (entity) => ({
      ...entity,
      score: 0
    })
  }
)

export default catEntity
