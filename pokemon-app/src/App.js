import React, { Component } from 'react';
import './App.css';

const pokeStyle = {
  textTransform: 'uppercase',
}

class App extends Component {
  state = {
    pokemon: null
  }

  componentDidMount(){
   const that = this;
   fetch('https://pokeapi.co/api/v2/pokemon-form/?limit=10&offset=0')
    .then((response) => response.json())
    .then((responseJson) => {
      that.setState({pokemon: responseJson.results})
    })
    .catch((error) => {
      console.error(error);
    });
  }

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle = () => this.setState({open: !this.state.open});

  handleClose = () => this.setState({open: false});

  renderCharacters(){
    const { pokemon } = this.state;
    if(pokemon && pokemon.length > 0){
      return pokemon.map((obj, key) =>{
        return <p style={pokeStyle} key={key}>{obj.name}</p>
      })
    }
  }

  render() {
    return (
      <div>
        {this.renderCharacters()}
      </div>
    );
  }
}

export default App;
