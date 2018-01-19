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
      error: {},
      all: []
    }

    it('should handle FETCH_CATS_REQUEST', () => {
      mutations.FETCH_CATS_REQUEST(state)
      expect(state.isFetching).toBe(true)
    })

    it('should handle FETCH_CATS_FAILURE', () => {
      const error = new Error('dummy error')
      mutations.FETCH_CATS_FAILURE(state, error)
      expect(state.error).toBeTruthy()
    })

    it('should handle FETCH_CATS_SUCCESS', () => {
      const cats = [ {}, {} ]
      mutations.FETCH_CATS_SUCCESS(state, cats)
      expect(state.all.length).toBeGreaterThan(0)
    })
  })

  describe('actions', () => {
    describe('fetchCats()', () => {
      
      it('should commit FETCH_CATS_REQUEST then FETCH_CATS_FAILURE if the request failed', () => {
        global.fetch = () => new Promise((resolve, reject) => reject({ ok: false }))
        let types = []
        const commit = (type, error) => {
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
          json: () => ({ images: [ {}, {} ] })
        }))
        let types = []
        const commit = (type, cats) => {
          if (cats) {
            types.push({
              type,
              cats
            })
          } else {
            types.push({ type })
          }
        }

        actions.fetchCats({ commit }).then(() => {
          expect(types).toEqual([
            { type: FETCH_CATS_REQUEST },
            { type: FETCH_CATS_SUCCESS, cats: [ {}, {} ] }
          ])
        })
      })
    })
  })
})