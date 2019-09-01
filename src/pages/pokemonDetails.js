import React, { Component } from 'react';
import { ScrollView, View, Text, FlatList, StyleSheet, Image } from 'react-native';

//API
import { 
  APIPokemon,
  APISpecies,
  APIEvolutions
} from 'app/src/API/routes';

export default class PokemonDetails extends Component {
  static navigationOptions = {
    title: 'Details'
  };

  state = {
    pokemon: {},
    evolutions: []
  }

  componentDidMount() {
    // console.disableYellowBox = true;
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

    const evolutionChain = await this.searchPokemonSpecie(pokemonName);
    let evolutions = await this.searchPokemonEvolutions(evolutionChain);
    if(evolutions.evolves_to.length > 0){ 
      const pokemonProperties = {
        id: this.getPokemonId(evolutions.species.url),
        name: evolutions.species.name,
        next: true
      }
      console.log('evolutions: ', evolutions);
      evolutions = this.mountPokemonEvolutions([ pokemonProperties ], evolutions.evolves_to)
      console.log('evolutions: ', evolutions);
    } else evolutions = [];

    // const evolutionList = evolutions.)
    this.setState({ pokemon });
    this.setState({ evolutions });
  }

  getPokemonId(value) {
    const breakedString = value.split('/');
    return breakedString[breakedString.length-2];
  }

  searchPokemon(name) {
    return APIPokemon.getPokemonByID(name);
  }
  searchPokemonSpecie(name) {
    return APISpecies.getSpecieByName(name)
    .then( result => result.evolution_chain.url);
  }
  searchPokemonEvolutions(URL) {
    return APIEvolutions.getPokemonEvolutions(URL)
    .then(result => result.chain);
  }

  mountPokemonEvolutions(evolutionList, evolutions) {
    const array = [];
    evolutions.forEach( evolution => {
      const evollutionWay = [...evolutionList];
      console.log('make sense', evollutionWay)
      evollutionWay.push(
        {
          id: this.getPokemonId(evolution.species.url),
          name: evolution.species.name,
          next: (evolution.evolves_to.length > 0)
        }
      )
      if(evolution.evolves_to.length > 0) {
        const returnItem = this.mountPokemonEvolutions(evollutionWay, evolution.evolves_to);
        array.push(...returnItem);
      } else {
        array.push(evollutionWay);
      }
    })
    return array;
  }

  //renders
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

  renderEvolutions = ({ item }) => (
    <View style={styles.evolutionItem}>
      <FlatList
        data={item}
        keyExtractor={data => data.name}
        renderItem={this.renderEvolutionWay}
        numColumns={3}
        contentContainerStyle={styles.listEvolutions} />
    </View>
  )
  renderEvolutionWay = ({item}) => (
    <View style={[styles.evolutionWayContainer, item.next? styles.evolutionWayContainerBorder : null ]}>
      <View style={styles.evolutionWayItem}>
        <Image 
            source={{uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.id}.png`}} 
            style={styles.evolutionWayImage} />
      </View>
      {/* <View style={styles.evolutionWayItem}>
        <Text>{ item.next? '->' : '' }</Text>
      </View> */}
    </View>
  )

  render() {
    return (
      <ScrollView style={styles.container}>
        <View>
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

          <View> 
            <FlatList
              data={this.state.evolutions}
              keyExtractor={(item, index) => `item-${index}`}
              renderItem={this.renderEvolutions}
              contentContainerStyle={styles.listEvolution} />
          </View>
        </View>
      </ScrollView>
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
  evolutionItem: {
    paddingTop: 10,
    paddingBottom: 10
  },
  evolutionWayContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5
  },
  evolutionWayContainerBorder: {
    borderRightWidth: 3,
    borderRightColor: '#ddd',
  },  
  evolutionWayItem: {
    // flex: 1,
  },  
  evolutionWayImage: {
    width: 100, 
    height: 100
  }
});