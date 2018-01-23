import {
  FETCH_CATS_REQUEST,
  FETCH_CATS_FAILURE,
  FETCH_CATS_SUCCESS,
  mutations,
  actions
} from './cats'

describe('cats.js', () => {
  describe('mutations', () => {
    const state = {
      isFetching: false,
      error: null,
      ids: [ 'a' ],
      byId: {
        a: {
          id: 'a',
          voteCount: 0,
          mashupCount: 0
        }
      }
    }

    it('should handle FETCH_CATS_REQUEST', () => {
      mutations.FETCH_CATS_REQUEST(state)
      expect(state.isFetching).toBe(true)
    })

    it('should handle FETCH_CATS_FAILURE', () => {
      const error = new Error('dummy error')
      state.isFetching = true
      mutations.FETCH_CATS_FAILURE(state, { error })
      expect(state.isFetching).toBe(false)
      expect(state.error).toBeTruthy()
    })

    it('should handle FETCH_CATS_SUCCESS', () => {
      const ids = [ 'a', 'aa' ]
      const byId = {
        a: { id: 'a' },
        aa: { id: 'aa' }
      }
      mutations.FETCH_CATS_SUCCESS(state, { ids, byId })
      expect(state.ids).toBe(ids)
      expect(state.byId).toBe(byId)
    })
    
    it('should handle ADD_VOTE', () => {
      state.byId = {
        a: { id: 'a', voteCount: 0, mashupCount: 0 },
        aa: { id: 'aa', voteCount: 0, mashupCount: 0 }
      }
      mutations.ADD_VOTE(state, { winnerId: 'a', loserId: 'aa' })
      expect(state.byId['a'].voteCount).toBe(1)
      expect(state.byId['a'].mashupCount).toBe(1)
      expect(state.byId['aa'].voteCount).toBe(0)
      expect(state.byId['aa'].mashupCount).toBe(1)
    })
  })

  describe('actions', () => {
    describe('fetchCats()', () => {
      
      it('should commit FETCH_CATS_REQUEST then FETCH_CATS_FAILURE if the request failed', () => {
        global.fetch = () => new Promise((resolve, reject) => reject({ ok: false }))
        let types = []
        const commit = ({ type, error }) => {
          if (error) {
            types.push({
              type,
              error
            })
          } else {
            types.push({ type })
          }
        }

        actions.fetchCats({ commit }).then(() => {
          expect(types).toEqual([
            { type: FETCH_CATS_REQUEST },
            { type: FETCH_CATS_FAILURE, error: { ok: false } }
          ])
        })
      })

      it('should commit FETCH_CATS_REQUEST then FETCH_CATS_SUCCESS if the request succeeded', () => {
        global.fetch = () => new Promise((resolve) => resolve({
          ok: true,
          json: () => ({ images: [ { id: 'a' }, { id: 'aa' } ] })
        }))
        let types = []
        const commit = ({ type, ids, byId }) => {
          if (ids) {
            types.push({
              type,
              ids,
              byId
            })
          } else {
            types.push({ type })
          }
        }

        actions.fetchCats({ commit }).then(() => {
          expect(types).toEqual([
            { type: FETCH_CATS_REQUEST },
            {
              type: FETCH_CATS_SUCCESS,
              ids: [ 'a', 'aa' ],
              byId: {
                a : { id: 'a', voteCount: 0, mashupCount: 0 },
                aa : { id: 'aa', voteCount: 0, mashupCount: 0 }
              }
            }
          ])
        })
      })
    })
  })
})