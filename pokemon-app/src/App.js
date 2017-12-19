import React, { Component } from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import Pokedex from './Pokedex';

import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

const pokeStyle = {
  textTransform: 'uppercase',
  textAlign: 'center',
}

const menuStyle = {
  alignItems: 'center'
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

  renderPokemon(){
    const { pokemon } = this.state;
    if(pokemon && pokemon.length > 0){
      return pokemon.map((obj, key) =>{
        return <Link to="/Pokedex.js"><li style={pokeStyle} key={key}>{obj.name}</li></Link>
      })
    }
  }

  render() {
    return (
      <Router>
        <div>
          <DropDownMenu style={menuStyle} iconButton={<img src="../src/images/pokeball.jpg" />} maxHeight={500}>
            <MenuItem>{this.renderPokemon()}</MenuItem>
          </DropDownMenu>

          <Route exact path="/Pokedex.js" component={Pokedex}/>
        </div>
      </Router>
    );
  }
}

export default App;
