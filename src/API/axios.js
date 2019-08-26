import axios from 'axios'

const API_URL = 'https://pokeapi.co/api/v2/'

export default axios.create({
  baseURL: API_URL,
  timeout: 100000,
})