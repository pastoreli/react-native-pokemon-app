import axios from 'axios'

const API_URL = 'https://pokeapi.co/api/v2/'

const normal = axios.create({
  baseURL: API_URL,
  timeout: 100000,
});

const noDefaultURL = axios.create({
  timeout: 100000,
});

export {
  normal,
  noDefaultURL
}