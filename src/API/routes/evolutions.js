import { noDefaultURL } from '../axios';

export default {
  getPokemonEvolutions(URL) {
    return noDefaultURL.get(URL)
    .then(result => result.data);
  }
}