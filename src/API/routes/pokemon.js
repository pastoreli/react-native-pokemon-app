import axios from '../axios';

const route = 'pokemon'

export default {
  getPokemons: (page = 0, limit = 20) => {
    return axios.get(`${route}?offset=${page}&limit=${limit}`)
    .then(result => result.data);
  },
  getPokemonByID: name => {
    return axios.get(`${route}/${name}`)
    .then(result => result.data);
  }
}