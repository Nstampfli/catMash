import 'whatwg-fetch'
import { handleResponse } from '@/utils/fetch'

export const FETCH_CATS_REQUEST = 'FETCH_CATS_REQUEST'
export const FETCH_CATS_FAILURE = 'FETCH_CATS_FAILURE'
export const FETCH_CATS_SUCCESS = 'FETCH_CATS_SUCCESS'

const state = {
  isFetching: false,
  error: {},
  all: []
}

export const mutations = {
  FETCH_CATS_REQUEST (state) {
    state.isFetching = true
  },
  FETCH_CATS_FAILURE (state, error) {
    state.isFetching = false
    state.error = error
  },
  FETCH_CATS_SUCCESS (state, cats) {
    state.isFetching = false
    state.all = cats
  }
}

export const actions = {
  async fetchCats ({ commit }) {
    commit(FETCH_CATS_REQUEST)
    const { LATELIER_API_CATS_ENDPOINT } = process.env
    try {
      const response = await fetch(LATELIER_API_CATS_ENDPOINT)
      const json = await handleResponse(response)
      commit(FETCH_CATS_SUCCESS, json.images)
    } catch (error) {
      commit(FETCH_CATS_FAILURE, error)
    }
  }
}

export default {
  state,
  mutations,
  actions
}
