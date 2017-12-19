import React, { Component } from 'react';
import './App.css';

const pokedex = require('pokedex-promise-v2');
const options = {
  protocol: 'https',
  hostName: 'localhost:443',
  versionPath: '/api/v2/',
  cacheLimit: 100 * 1000, // 100s
  timeout: 5 * 1000 // 5s
}
const P = new pokedex(options);

class Pokedex extends Component {
  state = {
    pokedex: null
  }

  componentDidMount(){
   const that = this;
   fetch('https://pokeapi.co/api/v2/pokemon-form/?limit=151&offset=0')
    .then((response) => response.json())
    .then((responseJson) => {
      that.setState({pokemon: responseJson.results})
    })
    .catch((error) => {
      console.error(error);
    });
  }

  renderPokedex(){
    const { pokemon } = this.state;
    if(pokemon && pokemon.length > 0){
      return pokemon.map((obj, key) =>{
        return <p key={key}>{obj.key}</p>
        // const Pokedex = ({ match }) => {
        //   return <p>{match.obj.name}!</p>
        // }
        P.getPokemonFormByName("{this.renderPokemon()}")
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log('There was an ERROR: ', error);
        });
      })
    }
  }

  render() {
    return (
      <div>
        {this.renderPokedex()}
      </div>
    );
  }
}

export default Pokedex;
