import { schema } from 'normalizr'

const catEntity = new schema.Entity(
  'cats',
  { cats: {} },
  {
    processStrategy: (entity) => ({
      ...entity,
      voteCount: 0,
      mashupCount: 0
    })
  }
)

export default catEntity
