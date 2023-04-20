import { Component } from 'react';

import SearchBox from './components/search-box/search-box.component';
import CardList from './components/card-list/card-list.component';

import './App.css';

class App extends Component {
  
  constructor() {
    super();
    this.state = {
      monsters: [],
      searchInput: '',
    }
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => this.setState({ monsters: users }))
  }

  render() {
    const filteredMonsters = this.state.monsters
      .filter(monster => {
        const monsterName = monster.name.toLowerCase();
        const searchInput = this.state.searchInput.toLowerCase();
        return (
          monsterName.includes(searchInput) 
          || searchInput.includes(monsterName)
        )
      });

    return (
      <div className='App'>
        <h1 className='app-title'>Monsters Rolodex</h1>
        <SearchBox
          className='monsters-search-box' 
          placeholder='search monsters' 
          onChange={event => this.setState({ searchInput: event.target.value })}
        />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

export default App;