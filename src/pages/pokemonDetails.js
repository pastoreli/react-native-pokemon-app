import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';

//API
import { APIPokemon } from 'app/src/API/routes';

export default class PokemonDetails extends Component {
  static navigationOptions = {
    title: 'Details'
  };

  state = {
    pokemon: {}
  }

  componentDidMount() {
    console.disableYellowBox = true;
    this.load();
  }

  load = async () => {
    const {navigation} = this.props;
    const pokemonName = navigation.getParam('name')
    
    let pokemon = await this.searchPokemon(pokemonName);
    pokemon = {
      name: pokemon.name,
      types: pokemon.types,
      image: pokemon.sprites.front_default
    }
    console.log('name', pokemon);
    this.setState({ pokemon });
  }

  searchPokemon = (name) => {
    return APIPokemon.getPokemonByID(name);
  }

  renderType = ({ item }) => (
    <View
    style={styles.listTypeContent}>
      <View 
        style={styles.listTypeChip}>
        <Text 
          style={styles.listTypeChipText}>{ item.type.name }</Text>
      </View>
    </View>
  )

  render() {
    return (
      <View style={styles.container}>
        <View
          style={styles.pokemonImage}>
          <Image 
            source={{uri: this.state.pokemon.image}} 
            style={styles.pokemonImageURI} />
        </View>
        <Text
          style={styles.pokemonName}>{this.state.pokemon.name}</Text>
        <FlatList
          data={this.state.pokemon.types}
          keyExtractor={item => item.name}
          renderItem={this.renderType}
          contentContainerStyle={styles.listType} />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20
    // justifyContent: 'center',
    // alignItems: 'center'
  }, 
  pokemonImage: {
    alignItems: 'center'
  },
  pokemonImageURI: {
    width: 200, 
    height: 200
  },
  pokemonName: {
    fontSize: 36,
    fontWeight: 'bold',
    margin: 5
  },
  listType: {
    flexDirection: 'row'
  },
  listTypeContent: {
    padding: 5
  },  
  listTypeChip: {
    padding: 10,
    backgroundColor: '#EAA844',
    borderRadius: 15
  },
  listTypeChipText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
});