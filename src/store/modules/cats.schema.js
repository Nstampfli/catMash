import { schema } from 'normalizr'

const catEntity = new schema.Entity(
  'cats',
  { cats: {} },
  {
    processStrategy: (entity) => ({
      ...entity,
      url: entity.url.replace(/http:\/\/\d{2}.media.tumblr.com\//, 'https://media.tumblr.com/'),
      voteCount: 0,
      mashupCount: 0
    })
  }
)

export default catEntity
