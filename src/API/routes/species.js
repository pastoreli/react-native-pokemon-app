import { normal as axios } from '../axios';

const route = 'pokemon-species';

export default {
  getSpecieByName: name => {
    return axios.get(`${route}/${name}`)
    .then(result => result.data);
  }
}