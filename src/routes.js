import { createStackNavigator } from 'react-navigation';

import Main from './pages/main';
import PokemonDetails from './pages/pokemonDetails';

export default createStackNavigator(
  {
    Main: { screen: Main },
    Details: { screen: PokemonDetails }
  },
  {
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#FFF',
      },
      headerTintColor: '#000'
    }
  }
)