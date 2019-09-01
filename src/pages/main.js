import React, { Component } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  Image, 
  TouchableWithoutFeedback } from 'react-native';

//API
import { APIPokemon } from 'app/src/API/routes';

export default class Main extends Component {
  static navigationOptions = {
    title: 'Pokédex'
  };

  state = {
    pokemonList: []
  }

  componentDidMount() {
    this.loadPokemons();
    console.disableYellowBox = true;
  }

  loadPokemons = async (page = 121) => {
    const { results } = await APIPokemon.getPokemons(page);
    let pokemonList = [];
    for(const pokemon of results) {
      let pokemonResult = await APIPokemon.getPokemonByID(pokemon.name);
      pokemonResult = {
        name: pokemonResult.name,
        abilitie: pokemonResult.abilities,
        image: pokemonResult.sprites.front_default
      }
      pokemonList.push(pokemonResult);
    }

    this.setState({ pokemonList })

  }

  renderPokemons = ({ item }) => (
    <TouchableWithoutFeedback
      onPress={() => this.goToPokemonDetails(item.name)}>
      <View style={styles.card}>
        <Text style={styles.cardText}>{item.name}</Text>
        <Image 
          source={{uri: item.image}} 
          style={styles.cardImage} />
      </View>
    </TouchableWithoutFeedback>
  )

  goToPokemonDetails = name => {
    const {navigate} = this.props.navigation;
    navigate('Details', {name: name})
  } 

  render() {
    return (
      <View
        style={styles.container}>
        <FlatList
          data={this.state.pokemonList}
          keyExtractor={item => item.name}
          renderItem={this.renderPokemons}
          contentContainerStyle={styles.list}
          numColumns={2} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
  }, 
  list: {
    justifyContent: 'center',
    flexDirection: 'column',
    paddingTop: 20,
    paddingBottom: 20 
  },
  card: {
    flex: 1,
    margin: 10,
    minWidth: 160,
    maxWidth: 223,
    height: 180,
    maxHeight:304,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 1,
    borderRadius: 20,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  cardImage: {
    width: 120, 
    height: 120
  }
});
