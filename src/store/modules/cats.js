import 'whatwg-fetch'
import { normalize } from 'normalizr'
import catEntity from './cats.schema'

export const FETCH_CATS_REQUEST = 'FETCH_CATS_REQUEST'
export const FETCH_CATS_FAILURE = 'FETCH_CATS_FAILURE'
export const FETCH_CATS_SUCCESS = 'FETCH_CATS_SUCCESS'
export const ADD_VOTE = 'ADD_VOTE'

const state = {
  isFetching: true,
  error: null,
  ids: [],
  byId: {}
}

const getters = {
  getCatById: state => id => state.byId[id],
  getScore: state => (voteCount, mashupCount) => Number((voteCount / mashupCount).toFixed(4)),
  getScoreById: (state, getters) => id => {
    const cat = getters.getCatById(id)
    return getters.getScore(cat.voteCount, cat.mashupCount)
  }
}

export const mutations = {
  [FETCH_CATS_REQUEST] (state) {
    state.isFetching = true
  },
  [FETCH_CATS_FAILURE] (state, { error }) {
    state.isFetching = false
    state.error = error
  },
  [FETCH_CATS_SUCCESS] (state, { ids, byId }) {
    state.isFetching = false
    state.ids = ids
    state.byId = byId
  },
  [ADD_VOTE] (state, { winnerId, loserId }) {
    state.byId[winnerId].voteCount++
    state.byId[winnerId].mashupCount++
    state.byId[loserId].mashupCount++
  }
}

export const actions = {
  async fetchCats ({ commit, state }) {
    commit({ type: FETCH_CATS_REQUEST })
    try {
      const { images } = require(process.env.API_URL)
      const normalized = normalize(images, [ catEntity ])
      commit({
        type: FETCH_CATS_SUCCESS,
        ids: normalized.result,
        byId: normalized.entities.cats
      })
    } catch (error) {
      commit({
        type: FETCH_CATS_FAILURE,
        error
      })
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
