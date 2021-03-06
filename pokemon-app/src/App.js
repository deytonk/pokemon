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
  listStyleType: 'none',
}

const menuStyle = {
  marginLeft: '45%',
  marginTop: '100px'
}

const reset = {
  marginLeft: '-35%',
}

class App extends Component {
  state = {
    pokemon: null
  }

  // constructor(props) {
  //   super(props);
  //   this.state = {open: false};
  // }
  //
  // handleToggle = () => this.setState({open: !this.state.open});
  //
  // handleClose = () => this.setState({open: false});

  handleChange = (event, index, value) => this.setState({value});

  componentDidMount(){
    const that = this;
    for (let i = 0; i < 152; i++) {
     fetch(`https://pokeapi.co/api/v2/pokemon-form/${i}/?limit=151&offset=0`)
      .then((response) => response.json())
      .then((responseJson) => {
        that.setState({pokemon: responseJson.results})
      })
      .catch((error) => {
        console.error(error);
      });
    }
  }

  renderPokemon(){
    const { pokemon } = this.state;
    if(pokemon && pokemon.length > 0){
      return pokemon.map((obj, key) =>{
        return <ol><Link to="/Pokedex.js"><li style={pokeStyle} key={key}>{obj.name}</li></Link></ol>
      })
    }
  }

  render() {
    return (
      <Router>
        <div>
          <DropDownMenu style={menuStyle} iconButton={<img src="https://images-na.ssl-images-amazon.com/images/I/510JE1W%2BdlL._UX385_.jpg" alt={"Pokeball"} height={100} width={100} />} onChange={this.handleChange} maxHeight={500}>
            <MenuItem style={reset} >{this.renderPokemon()}</MenuItem>
          </DropDownMenu>

          <Route exact path="/" component={App}/>
          <Route path="/Pokedex.js" component={Pokedex}/>
        </div>
      </Router>
    );
  }
}

export default App;
