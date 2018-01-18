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

const mutations = {
  FETCH_CATS_REQUEST (state) {
    state.isFetching = true
  },
  FETCH_CATS_FAILURE (state, error) {
    state.error = error
  },
  FETCH_CATS_SUCCESS (state, { images }) {
    state.all = images
  }
}

const actions = {
  async fetchCatsRequest () {
    const { LATELIER_API_BASE_URL, LATELIER_API_CATS_ENDPOINT } = process.env
    const response = await fetch(`${LATELIER_API_BASE_URL}/${LATELIER_API_CATS_ENDPOINT}`)
    const json = await handleResponse(response)
    console.log(json)
  }
}

export default {
  state,
  mutations,
  actions
}
