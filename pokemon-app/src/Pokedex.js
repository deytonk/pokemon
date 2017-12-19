import React, { Component } from 'react';
import './App.css';

class Pokedex extends Component {
  state = {
    pokemon: null
  }

  renderPokedex(){
    const { pokemon } = this.state;
    if(pokemon && pokemon.length > 0){
      return pokemon.map((obj, key) =>{
        return <p key={key}>{obj.characteristics}</p>
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
